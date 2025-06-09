'use client'

import { useEffect, useRef, useState } from 'react'

import type { PhotoList } from '@/validations/photo'

import { PhotoCard } from './PhotoCard'

type MasonryGridProps = {
  photos: PhotoList
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
}

export function MasonryGrid({ photos, onLoadMore, hasMore = false, isLoading = false }: MasonryGridProps) {
  const [columns, setColumns] = useState(getInitialColumns())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateColumns() {
      setColumns(getInitialColumns())
    }

    window.addEventListener('resize', updateColumns)
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  useEffect(() => {
    if (!hasMore || isLoading || !onLoadMore) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onLoadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading, onLoadMore])

  function getInitialColumns() {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const photoColumns = Array.from({ length: columns }, (_, i) => {
    return photos.filter((_, index) => index % columns === i)
  })

  return (
    <div className='relative w-full'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {photoColumns.map((columnPhotos, columnIndex) => (
          <div key={columnIndex} className='flex flex-col gap-4'>
            {columnPhotos.map(photo => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </div>
        ))}
      </div>

      {(hasMore || isLoading) && (
        <div ref={loadMoreRef} className='mt-8 flex items-center justify-center'>
          {isLoading ? (
            <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600' />
          ) : null}
        </div>
      )}
    </div>
  )
}
