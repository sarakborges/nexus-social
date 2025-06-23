import { request } from '@/Apis/Request.api'

export const addProfileToUser = async ({ profile }: { profile: string }) => {
  try {
    const userRequest = await request.patch(`/users/add`, {
      profile
    })

    const { status } = userRequest

    if (status !== 200) {
      return
    }

    return true
  } catch (e) {
    console.log(e)
  }
}
