import { request } from '@/Apis/Request.api'

export const getProfileById = async (id: string) => {
  try {
    const profilesRequest = await request.get(`/profiles/id/${id}`)

    const { status, data } = profilesRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
