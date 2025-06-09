import { request } from '@/Apis/Request.api'

export const getAllProfiles = async () => {
  try {
    const profilesRequest = await request.get(`/profiles`)

    const { status, data } = profilesRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
