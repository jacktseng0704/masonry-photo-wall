import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'

import { getPhotoList } from '@/apis/photo'
import { PhotoGallery } from '@/components/PhotoGallery'

export default async function HomePage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['photos'],
    queryFn: () => getPhotoList({}),
    initialPageParam: 1,
  })

  return (
    <main className='min-h-screen py-8'>
      <div className='container mx-auto h-full px-6 md:px-12'>
        <h1 className='mb-8 text-center text-3xl font-bold text-gray-900'>Photo Gallery</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <PhotoGallery />
          </Suspense>
        </HydrationBoundary>
      </div>
    </main>
  )
}
