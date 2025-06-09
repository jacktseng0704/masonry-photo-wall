// utils/apiClient.ts
import { z, ZodSchema } from 'zod'

export const errorResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  code: z.number(),
})

export async function fetchWithValidation<T>(url: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    const errorResponse = await response.json()
    const parsedErrorResponse = errorResponseSchema.safeParse(errorResponse)

    if (parsedErrorResponse.success) {
      const { data } = parsedErrorResponse
      console.log('🚀 ~ api error:', data)
      throw new Error(data.message || 'An error occurred while fetching remote data')
    }

    const errorText = await response.text()

    console.error(`Network response was not ok: ${response.statusText}`, errorText)
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data = await response.json()
  const result = schema.safeParse(data)

  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error('Invalid response format')
  }

  return result.data
}
