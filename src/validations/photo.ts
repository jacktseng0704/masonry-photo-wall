import { z } from 'zod'

export const photoListResponseSchema = z.array(
  z.object({
    id: z.string(),
    author: z.string(),
    width: z.number(),
    height: z.number(),
    url: z.string(),
    download_url: z.string(),
  }),
)

export type PhotoList = z.infer<typeof photoListResponseSchema>
export type Photo = PhotoList[number]
