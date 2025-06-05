import { request } from '@/Apis/Request.api'

export const getProfile = async (id: number) => {
  const profilesRequest = await request.get(`/profiles/${id}`)

  const { status, data } = profilesRequest

  if (status !== 200) {
    return
  }

  return data
}
