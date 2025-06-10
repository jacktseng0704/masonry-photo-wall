'use client'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

import { usePhotos } from '@/hooks/usePhotos'

const MasonryGrid = dynamic(() => import('@/components/MasonryGrid').then(mod => mod.MasonryGrid), { ssr: false })

export function PhotoGallery() {
  const searchParams = useSearchParams()
  const authorFilter = searchParams.get('author')

  const { photos, loadMore, hasMore, isLoading, isLoadingMore, isError, error } = usePhotos()

  // derived state
  const filteredPhotos = useMemo(
    () =>
      authorFilter ? photos.filter(photo => photo.author.toLowerCase().includes(authorFilter.toLowerCase())) : photos,
    [photos, authorFilter],
  )

  if (isError) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center'>
        <p className='text-center text-red-600'>Error loading photos: {error?.message}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className='aspect-[3/4] animate-pulse rounded-lg bg-gray-200' />
        ))}
      </div>
    )
  }

  return <MasonryGrid photos={filteredPhotos} onLoadMore={loadMore} hasMore={hasMore} isLoading={isLoadingMore} />
}
