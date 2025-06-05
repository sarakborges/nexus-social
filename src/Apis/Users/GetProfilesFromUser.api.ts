import { request } from '@/Apis/Request.api'

export const getProfilesFromUser = async (userId: number) => {
  const profilesRequest = await request.get(`/users/${userId}/profiles`)

  const { status, data } = profilesRequest

  if (status !== 200) {
    return
  }

  return data
}
