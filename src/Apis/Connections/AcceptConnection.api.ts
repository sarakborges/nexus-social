import { request } from '@/Apis/Request.api'

export const acceptConnection = async (profileId: string) => {
  try {
    const connectionsRequest = await request.patch(
      `/connections/accept/${profileId}`
    )

    const { status, data } = connectionsRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
