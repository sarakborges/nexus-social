import { request } from '@/Apis/Request.api'

export const deleteProfile = async (id: number) => {
  const profilesRequest = await request.delete(`/profiles/${id}`)

  const { status } = profilesRequest

  if (status !== 200) {
    return false
  }

  return true
}
