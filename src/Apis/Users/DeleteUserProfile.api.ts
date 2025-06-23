import { request } from '@/Apis/Request.api'

export const deleteUserProfile = async (profile: string) => {
  try {
    const profilesRequest = await request.patch(`/users/remove`, {
      profile
    })

    const { status } = profilesRequest

    if (status !== 200) {
      return false
    }

    return true
  } catch (e) {
    console.log(e)
  }
}
