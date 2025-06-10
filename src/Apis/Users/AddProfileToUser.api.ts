import { request } from '@/Apis/Request.api'

export const addProfileToUser = async ({
  userId,
  profile
}: {
  userId: string
  profile: string
}) => {
  try {
    const userRequest = await request.patch(`/users/${userId}/add`, {
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
