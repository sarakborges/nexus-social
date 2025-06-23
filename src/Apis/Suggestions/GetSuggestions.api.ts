import { request } from '@/Apis/Request.api'

export const getSuggestions = async () => {
  try {
    const suggestionsRequest = await request.get(`/suggestions`)

    const { status, data } = suggestionsRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
