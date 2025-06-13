import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { getPhotoList } from '@/apis/photo'
import { PhotoGallery } from '@/components/PhotoGallery'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({ searchParams }: Props) {
  const authorQuery = (await searchParams).author || ''
  const initialAuthor = typeof authorQuery === 'string' ? authorQuery : ''

  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['photos', initialAuthor],
    queryFn: () => getPhotoList({}),
    initialPageParam: 1,
  })

  return (
    <main className='min-h-screen py-8'>
      <div className='container mx-auto h-full px-6 md:px-12'>
        <h1 className='mb-8 text-center text-3xl font-bold text-gray-900'>Photo Gallery</h1>

        <HydrationBoundary state={dehydrate(queryClient)}>
          <PhotoGallery />
        </HydrationBoundary>
      </div>
    </main>
  )
}
