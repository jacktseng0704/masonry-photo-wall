'use client'

import { Masonry } from 'masonic'
import { useEffect, useRef } from 'react'

import type { PhotoList } from '@/validations/photo'

import { PhotoCard } from './PhotoCard'

type MasonryGridProps = {
  photos: PhotoList
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
}

export function MasonryGrid({ photos, onLoadMore, hasMore = false, isLoading = false }: MasonryGridProps) {
  // refs
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore || isLoading || !onLoadMore || !targetRef.current) return

    const observer = new IntersectionObserver(entries => entries[0].isIntersecting && onLoadMore(), { threshold: 0.1 })

    observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore])

  // const getColumns = (width: number) => {
  //   if (width < 640) return 1
  //   if (width < 1024) return 2
  //   if (width < 1280) return 3
  //   if (width < 1536) return 4
  //   return 5
  // }

  return (
    <div className='relative w-full'>
      <Masonry
        items={photos}
        columnGutter={16} // gap-4 in tailwind
        columnWidth={240} // reasonable width for photo cards
        render={({ data }) => <PhotoCard photo={data} />}
        overscanBy={5}
        // columnCount={getColumns} // responsive columns
      />

      {(hasMore || isLoading) && (
        <div ref={targetRef} className='mt-8 flex items-center justify-center'>
          {isLoading ? (
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600' />
          ) : null}
        </div>
      )}
    </div>
  )
}
