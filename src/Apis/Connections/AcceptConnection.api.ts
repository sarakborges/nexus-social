import { request } from '@/Apis/Request.api'

export const acceptConnection = async (between: Array<string>) => {
  try {
    const connectionsRequest = await request.post(`/connections/accept`, {
      between
    })

    const { status, data } = connectionsRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
