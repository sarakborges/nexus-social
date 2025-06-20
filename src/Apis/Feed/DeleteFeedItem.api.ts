import { request } from '@/Apis/Request.api'

export const deleteFeedItem = async (id: string) => {
  try {
    const feedRequest = await request.delete(`/feed/${id}`)

    const { status, data } = feedRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
