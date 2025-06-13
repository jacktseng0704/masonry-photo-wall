import Image from 'next/image'

import { cn } from '@/lib/utils'
import { Photo } from '@/validations/photo'

type PhotoCardProps = {
  photo: Photo
  className?: string
}

export default function PhotoCard({ photo, className }: PhotoCardProps) {
  return (
    <article
      className={cn('group relative h-full w-full overflow-hidden rounded-lg shadow-md transition-all', className)}
    >
      <Image
        src={photo.download_url}
        alt={`Photo by ${photo.author}`}
        width={photo.width}
        height={photo.height}
        loading='lazy'
        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
        className='h-full w-full object-cover transition-all duration-500 group-hover:scale-110'
      />
      <div
        className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300'
        aria-hidden='true'
      />
      <div className='absolute bottom-0 left-0 p-4 text-white transition-opacity duration-300'>
        <p className='text-sm font-medium'>
          <span className='sr-only'>Photo ID: </span>
          {photo.id}
        </p>
        <p className='text-lg font-bold'>
          <span className='sr-only'>Photo by: </span>
          {photo.author}
        </p>
      </div>
    </article>
  )
}
