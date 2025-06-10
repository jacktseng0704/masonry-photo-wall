import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { Photo } from '@/validations/photo'

type PhotoCardProps = {
  photo: Photo
  className?: string
}

export function PhotoCard({ photo, className }: PhotoCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:scale-[1.02]',
        className,
      )}
    >
      <div className='w-full'>
        <Image src={photo.download_url} alt={`Photo by ${photo.author}`} width={photo.width} height={photo.height} />
      </div>
      <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent p-4'>
        <p className='text-sm font-medium text-white'>
          {photo.id} {photo.author}
        </p>
      </div>
    </div>
  )
}
