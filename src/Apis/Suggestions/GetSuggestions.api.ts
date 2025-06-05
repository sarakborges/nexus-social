import { request } from '@/Apis/Request.api'

export const getSuggestions = async () => {
  const suggestionsRequest = await request.get(`/suggestions`)

  const { status, data } = suggestionsRequest

  if (status !== 200) {
    return
  }

  return data
}
