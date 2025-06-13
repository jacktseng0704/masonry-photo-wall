const MIN_SKELETON_HEIGHT = 150
const MAX_SKELETON_HEIGHT = 350

const mockPhotos = Array(15)
  .fill(0)
  .map((_, index) => ({
    id: `skeleton-${index}`,
    height: Math.floor(Math.random() * (MAX_SKELETON_HEIGHT - MIN_SKELETON_HEIGHT + 1)) + MIN_SKELETON_HEIGHT,
  }))

export default function MasonryGridSkeleton() {
  return (
    <div className='columns-[300px] gap-4' aria-hidden='true'>
      {mockPhotos.map(photo => (
        <div
          key={photo.id}
          style={{ height: `${photo.height}px` }}
          className='mb-5 animate-pulse break-inside-avoid rounded-lg bg-gray-200'
        />
      ))}
    </div>
  )
}
