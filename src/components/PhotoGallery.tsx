'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import { Input } from '@/components/ui/input'
import { usePhotos } from '@/hooks/usePhotos'

const MasonryGrid = dynamic(() => import('@/components/MasonryGrid').then(mod => mod.MasonryGrid), { ssr: false })

export function PhotoGallery() {
  const { photos, loadMore, hasMore, isLoading, isLoadingMore, isError, error, authorFilter, setAuthorFilter } =
    usePhotos()

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
      <>
        <div className='mx-auto mt-8 max-w-xl'>
          <div className='h-12 animate-pulse rounded-md bg-gray-200 md:h-14' />
        </div>
        <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='aspect-[3/4] animate-pulse rounded-lg bg-gray-200' />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className='mx-auto max-w-xl'>
        <form
          onSubmit={e => {
            e.preventDefault()
            const form = e.target as HTMLFormElement
            const input = form.elements.namedItem('author') as HTMLInputElement
            setAuthorFilter(input.value)
          }}
        >
          <Input name='author' className='h-12 md:h-14' placeholder='Filter by author...' defaultValue={authorFilter} />
        </form>
      </div>
      <div className='mt-8'>
        <MasonryGrid photos={filteredPhotos} onLoadMore={loadMore} hasMore={hasMore} isLoading={isLoadingMore} />
      </div>
    </>
  )
}
