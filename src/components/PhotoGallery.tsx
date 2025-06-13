'use client'
import dynamic from 'next/dynamic'
import { useMemo, useId } from 'react'

import { Input } from '@/components/ui/input'
import { usePhotos } from '@/hooks/usePhotos'

import MasonryGridSkeleton from './MasonryGridSkeleton'

const MasonryGrid = dynamic(() => import('@/components/MasonryGrid').then(mod => mod.MasonryGrid), { ssr: false })

export function PhotoGallery() {
  const { photos, loadMore, hasMore, isLoading, isLoadingMore, isError, error, authorFilter, setAuthorFilter } =
    usePhotos()

  const authorInputId = useId()

  // derived state
  const filteredPhotos = useMemo(
    () =>
      authorFilter ? photos.filter(photo => photo.author.toLowerCase().includes(authorFilter.toLowerCase())) : photos,
    [photos, authorFilter],
  )

  if (isError) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center' role='alert' aria-live='assertive'>
        <p className='text-center text-red-600'>Error loading photos: {error?.message || 'Unknown error occurred'}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <>
        <div className='mx-auto my-8 max-w-xl'>
          <div className='h-12 animate-pulse rounded-md bg-gray-200 md:h-14' aria-hidden='true' />
        </div>

        <div aria-label='Loading photos' role='status'>
          <MasonryGridSkeleton />
          <span className='sr-only'>Loading photos...</span>
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
          role='search'
          aria-label='Filter photos by author'
        >
          <label htmlFor={authorInputId} className='sr-only'>
            Filter by author
          </label>
          <Input
            id={authorInputId}
            name='author'
            className='h-12 md:h-14'
            placeholder='Filter by author...'
            defaultValue={authorFilter}
            aria-label='Filter by author'
          />
        </form>
      </div>

      <div className='mt-8'>
        {filteredPhotos.length > 0 ? (
          <MasonryGrid photos={filteredPhotos} onLoadMore={loadMore} hasMore={hasMore} isLoading={isLoadingMore} />
        ) : (
          <p className='py-12 text-center text-gray-500' role='status'>
            No photos found matching &ldquo;{authorFilter}&rdquo;
          </p>
        )}
      </div>
    </>
  )
}
