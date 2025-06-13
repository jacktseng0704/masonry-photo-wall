// utils/apiClient.ts
import { z, ZodSchema } from 'zod'

export const errorResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  code: z.number(),
})

export class ApiError extends Error {
  status: number
  statusText: string
  data?: unknown

  constructor(message: string, status: number, statusText: string, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.data = data
  }
}

export async function fetchWithValidation<T>(url: string, schema: ZodSchema<T>, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`
      let errorData: unknown

      try {
        // Try to parse as JSON first
        const errorResponse = await response.json()
        const parsedErrorResponse = errorResponseSchema.safeParse(errorResponse)

        if (parsedErrorResponse.success) {
          const { data } = parsedErrorResponse
          errorMessage = data.message || errorMessage
          errorData = data
        } else {
          errorData = errorResponse
        }
      } catch {
        // If JSON parsing fails, try to get text
        try {
          const errorText = await response.text()
          if (errorText) {
            errorData = errorText
          }
        } catch (textError) {
          // If both fail, just use the status text
          console.error('Failed to parse error response:', textError)
        }
      }

      throw new ApiError(errorMessage, response.status, response.statusText, errorData)
    }

    const data = await response.json()
    const result = schema.safeParse(data)

    if (!result.success) {
      console.error('Validation error:', result.error.format())
      throw new ApiError('Invalid response format', 200, 'OK', result.error.format())
    }

    return result.data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // Handle fetch errors (network issues, etc.)
    console.error('Fetch error:', error)
    throw new ApiError(error instanceof Error ? error.message : 'Network request failed', 0, 'Network Error', error)
  }
}
