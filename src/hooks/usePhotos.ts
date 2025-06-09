'use client'

import { useInfiniteQuery } from '@tanstack/react-query'

import { getPhotoList } from '@/apis/photo'

export function usePhotos() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam = 1 }) => getPhotoList({ page: pageParam, limit: 30 }),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
  })

  const photos = data?.pages.flat() ?? []
  const loadMore = () => {
    if (!isFetchingNextPage) {
      fetchNextPage()
    }
  }

  return {
    photos,
    loadMore,
    hasMore: hasNextPage,
    isLoading,
    isLoadingMore: isFetchingNextPage,
    isError,
    error,
  }
}
