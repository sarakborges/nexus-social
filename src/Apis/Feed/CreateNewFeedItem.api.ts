import { request } from '@/Apis/Request.api'
import { FeedType } from '@/Types/Feed.type'

export const createNewFeedItem = async (item: Partial<FeedType>) => {
  try {
    const feedRequest = await request.post(`/feed`, item)

    const { status, data } = feedRequest

    if (status !== 201) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
