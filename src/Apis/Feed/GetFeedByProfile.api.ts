import { request } from '@/Apis/Request.api'

export const getFeedByProfile = async () => {
  try {
    const feedRequest = await request.get(`/feed`)

    const { status, data } = feedRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
