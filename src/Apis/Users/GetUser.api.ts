import { request, setFilters } from '@/Apis/Request.api'

export const getUser = async (id: string) => {
  const userRequest = await request.get(
    `/users${setFilters({ params: { id } })}`
  )

  const { status, data } = userRequest

  if (status !== 200) {
    return
  }

  return data[0]
}
