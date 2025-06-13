import { buildQueryString } from '@/lib/buildQueryString'
import { photoListResponseSchema } from '@/validations/photo'

import { fetchWithValidation, ApiError } from './apiClient'

// Base URL for photo API
const API_BASE_URL = 'https://picsum.photos/v2'

type GetPhotoListParams = {
  page?: number
  limit?: number
}

/**
 * Fetches a list of photos from the API
 * @param params - Parameters for the API request
 * @returns A promise that resolves to an array of photos
 */
export async function getPhotoList({ page, limit = 30 }: GetPhotoListParams) {
  const queryString = buildQueryString({ page, limit })
  const apiEndpoint = `${API_BASE_URL}/list${queryString}`

  try {
    return await fetchWithValidation(apiEndpoint, photoListResponseSchema, {
      headers: {
        accept: 'application/json',
      },
      // Add cache control for better performance
      cache: 'default',
      next: { revalidate: 3600 }, // Revalidate every hour
    })
  } catch (err) {
    // Log the error with more context
    if (err instanceof ApiError) {
      console.error(`API Error (${err.status}): ${err.message}`, err.data)
    } else {
      console.error('Unexpected error fetching photos:', err)
    }

    // Re-throw to let the calling code handle it
    throw err
  }
}
