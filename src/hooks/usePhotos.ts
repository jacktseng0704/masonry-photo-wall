'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { getPhotoList } from '@/apis/photo'

export function usePhotos() {
  const searchParams = useSearchParams()
  const [authorFilter, setAuthorFilter] = useState(searchParams.get('author') || '')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['photos', authorFilter],
    queryFn: ({ pageParam = 1 }) => getPhotoList({ page: pageParam, limit: 30 }),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
  })

  const photos = data?.pages.flat() ?? []

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetchingNextPage])

  // Update URL when filter changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (authorFilter) {
      params.set('author', authorFilter)
    } else {
      params.delete('author')
    }
    window.history.replaceState(null, '', `?${params.toString()}`)
  }, [authorFilter])

  return {
    photos,
    loadMore,
    hasMore: hasNextPage,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    isError,
    error,
    authorFilter,
    setAuthorFilter,
  }
}
