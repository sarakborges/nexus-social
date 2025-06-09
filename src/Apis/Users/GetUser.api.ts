import { request } from '@/Apis/Request.api'

export const getUser = async (id: number) => {
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
