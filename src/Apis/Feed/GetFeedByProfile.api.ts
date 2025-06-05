import { request } from '@/Apis/Request.api'

export const getFeedByProfile = async (id: number) => {
  const feedRequest = await request.get(`/feed/${id}`)

  const { status, data } = feedRequest

  if (status !== 200) {
    return
  }

  return data
}
