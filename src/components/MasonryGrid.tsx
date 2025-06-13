'use client'

import { Masonry } from 'masonic'
import { useEffect, useRef } from 'react'

import type { Photo, PhotoList } from '@/validations/photo'

import PhotoCard from './PhotoCard'

type MasonryGridProps = {
  photos: PhotoList
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
  authorFilter?: string
}

export function MasonryGrid({
  photos,
  onLoadMore,
  hasMore = false,
  isLoading = false,
  authorFilter,
}: MasonryGridProps) {
  // refs
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore || isLoading || !onLoadMore || !targetRef.current) return

    const observer = new IntersectionObserver(entries => entries[0].isIntersecting && onLoadMore(), { threshold: 0.1 })

    observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore])

  return (
    <section className='relative w-full' aria-label='Photo gallery'>
      <Masonry
        key={authorFilter}
        items={photos}
        columnGutter={16}
        render={MasonryCard}
        overscanBy={5}
        columnWidth={300}
        columnCount={undefined} // Let masonic calculate based on container width
      />

      {(hasMore || isLoading) && (
        <div ref={targetRef} className='mt-8 flex items-center justify-center' role='status' aria-live='polite'>
          {isLoading ? (
            <>
              <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600' />
              <span className='sr-only'>Loading more photos...</span>
            </>
          ) : (
            <span className='sr-only'>Scroll to load more photos</span>
          )}
        </div>
      )}
    </section>
  )
}

type MasonryCardProps = {
  data: Photo
}

function MasonryCard({ data }: MasonryCardProps) {
  return <PhotoCard photo={data} />
}
