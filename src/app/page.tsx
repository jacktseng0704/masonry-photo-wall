import { PhotoGallery } from '@/components/PhotoGallery'

export default function Home() {
  return (
    <main className='min-h-screen py-8'>
      <div className='container mx-auto h-full px-6 md:px-12'>
        <h1 className='mb-8 text-center text-3xl font-bold text-gray-900'>Photo Gallery</h1>

        <PhotoGallery />
      </div>
    </main>
  )
}
