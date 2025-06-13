'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { getPhotoList } from '@/apis/photo'

export function usePhotos() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [authorFilter, setAuthorFilter] = useState(searchParams.get('author') || '')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['photos', authorFilter],
    queryFn: ({ pageParam = 1 }) => getPhotoList({ page: pageParam, limit: 30 }),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with max 30s
  })

  const photos = data?.pages.flat() ?? []

  const loadMore = useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, isFetchingNextPage])

  // Update URL when filter changes
  useEffect(() => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString())

    // Update the author parameter
    if (authorFilter) {
      params.set('author', authorFilter)
    } else {
      params.delete('author')
    }

    // Use Next.js router to update the URL without a full page reload
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    router.replace(newUrl, { scroll: false })
  }, [authorFilter, router, searchParams])

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
