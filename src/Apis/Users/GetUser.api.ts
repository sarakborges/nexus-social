import { request } from '@/Apis/Request.api'

export const getUser = async () => {
  try {
    const userRequest = await request.get(`/users/me`)

    const { status, data } = userRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
