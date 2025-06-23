import { request } from '@/Apis/Request.api'

export const createConnection = async (profileId: string) => {
  try {
    const connectionsRequest = await request.post(`/connections`, { profileId })

    const { status, data } = connectionsRequest

    if (status !== 201) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
