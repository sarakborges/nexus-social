import { request } from '@/Apis/Request.api'

export const deleteConnection = async (profileId: string) => {
  try {
    const connectionsRequest = await request.delete(
      `/connections/delete${profileId}`
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
