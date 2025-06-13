import type { Metadata, Viewport } from 'next'

import ClientProvider from '@/providers/provider.client'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Photo Gallery | Masonry Layout',
  description: 'A beautiful photo gallery with masonry layout, infinite scrolling, and filtering capabilities',
  keywords: ['photos', 'gallery', 'masonry', 'infinite scroll', 'react', 'nextjs'],
  authors: [{ name: 'Jack Tseng' }],
  openGraph: {
    title: 'Photo Gallery | Masonry Layout',
    description: 'A beautiful photo gallery with masonry layout, infinite scrolling, and filtering capabilities',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
