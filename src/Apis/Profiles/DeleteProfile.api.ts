import { request, setFilters } from '@/Apis/Request.api'

export const deleteProfile = async (id: string) => {
  const profilesRequest = await request.delete(
    `/profiles${setFilters({ params: { id } })}`
  )

  const { status } = profilesRequest

  if (status !== 200) {
    return false
  }

  return true
}
