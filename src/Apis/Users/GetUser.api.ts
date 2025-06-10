import { request } from '@/Apis/Request.api'

export const getUser = async (id: string) => {
  try {
    const userRequest = await request.get(`/users/${id}`)

    const { status, data } = userRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
