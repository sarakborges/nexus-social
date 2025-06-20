import { request } from '@/Apis/Request.api'

export const createConnection = async ({
  requestedBy,
  between
}: {
  requestedBy: string
  between: Array<string>
}) => {
  try {
    const connectionsRequest = await request.post(`/connections/create`, {
      requestedBy,
      between
    })

    const { status, data } = connectionsRequest

    if (status !== 201) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
