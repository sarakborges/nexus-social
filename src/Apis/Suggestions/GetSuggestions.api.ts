import { request, setFilters } from '@/Apis/Request.api'

export const getSuggestions = async () => {
  const suggestionsRequest = await request.get(
    `/suggestions${setFilters({
      filters: {
        perPage: 3
      }
    })}`
  )

  const { status, data } = suggestionsRequest

  if (status !== 200) {
    return
  }

  return data
}
