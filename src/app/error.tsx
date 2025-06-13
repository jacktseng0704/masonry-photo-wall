'use client'

import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

const defaultMessage = `We encountered an error while trying to load this page. This could be due to a network issue or a problem
with our servers.`

type ErrorPageProps = {
  error: Error & { digest?: string; status?: number }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Log the error to the console for debugging
  useEffect(() => {
    console.error('Application error:', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      status: error.status,
    })
  }, [error])

  // Determine if this is a network error
  const isNetworkError = error.message?.includes('network') || error.message?.includes('fetch')

  // Determine if this is a server error
  const isServerError = error.status ? error.status >= 500 : false

  // Customize message based on error type
  let errorMessage = error.message || defaultMessage
  if (isNetworkError) {
    errorMessage = 'Network connection issue. Please check your internet connection and try again.'
  } else if (isServerError) {
    errorMessage = 'Server error. Our team has been notified and is working on a fix.'
  }

  return (
    <div className='flex min-h-[70vh] grow items-center justify-center p-4' role='alert' aria-live='assertive'>
      <div className='max-w-md rounded-lg bg-white/5 p-6 text-center shadow-md'>
        <div className='mb-4 flex justify-center'>
          <AlertTriangle className='h-24 w-24 text-red-500' aria-hidden='true' />
        </div>
        <h1 className='mb-2 text-2xl font-bold'>Something Went Wrong</h1>
        <p className='mb-6 text-gray-600 dark:text-gray-300'>{errorMessage}</p>
        <div className='flex flex-col justify-center gap-3 sm:flex-row'>
          <Button onClick={reset} variant='default'>
            Try Again
          </Button>
          <Button asChild variant='outline'>
            <Link href='/'>Go to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
