import { request } from '@/Apis/Request.api'

export const getSuggestions = async (profileId: number) => {
  try {
    const suggestionsRequest = await request.get(`/suggestions/${profileId}`)

    const { status, data } = suggestionsRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
