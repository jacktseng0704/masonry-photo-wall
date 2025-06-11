import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'

import { getPhotoList } from '@/apis/photo'
import { PhotoGallery } from '@/components/PhotoGallery'
// import { Input } from '@/components/ui/input'

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

        {/* <Suspense>
          <FilterByAuthorForm initialAuthor={initialAuthor} />
        </Suspense> */}

        {/* <div className='h-10' /> */}

        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <PhotoGallery />
          </Suspense>
        </HydrationBoundary>
      </div>
    </main>
  )
}

// type FilterByAuthorFormProps = {
//   initialAuthor: string
// }

// function FilterByAuthorForm({ initialAuthor }: FilterByAuthorFormProps) {
//   return (
//     <div className='mx-auto mt-8 max-w-xl'>
//       <Input name='author' defaultValue={initialAuthor} className='h-12 md:h-14' placeholder='Filter by author...' />
//     </div>
//   )
// }
