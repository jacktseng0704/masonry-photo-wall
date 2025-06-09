import { buildQueryString } from '@/lib/buildQueryString'
import { photoListResponseSchema } from '@/validations/photo'

import { fetchWithValidation } from './apiClient'

// Base URL for photo API
const API_BASE_URL = 'https://picsum.photos/v2'

type GetPhotoListParams = {
  page?: number
  limit?: number
}

export async function getPhotoList({ page, limit = 30 }: GetPhotoListParams) {
  const queryString = buildQueryString({ page, limit })

  const apiEndpoint = `${API_BASE_URL}/list${queryString}`

  console.log('🚀 ~ getPhotoList ~ apiEndpoint:', apiEndpoint)

  try {
    const data = await fetchWithValidation(apiEndpoint, photoListResponseSchema, {
      headers: {
        accept: 'application/json',
      },
    })

    return data
  } catch (err) {
    console.log('🚀 ~ getPhotoList ~ err:', err)

    throw err
  }
}
