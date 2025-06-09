/**
 * Builds a URL query string from an object of parameters
 *
 * @param params - Object containing key-value pairs to convert to a query string
 * @returns Formatted query string with leading '?' or empty string if no valid params
 *
 *  @example
 * buildQueryString({ page: 1, limit: 10 })
 * // Returns "?page=1&limit=10"
 */
export function buildQueryString<
  T extends Record<string, string | number | boolean | string[] | number[] | boolean[] | null | undefined>,
>(params?: T | null): string {
  if (!params || Object.keys(params).length === 0) {
    return ''
  }

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    // Skip null or undefined values
    if (value == null) {
      return
    }

    // Handle array values
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item != null) {
          searchParams.append(key, String(item))
        }
      })
    } else {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}
