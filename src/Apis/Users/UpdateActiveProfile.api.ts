import { request } from '@/Apis/Request.api'

export const updateActiveProfile = async (profileId: string) => {
  try {
    const profilesRequest = await request.patch(`/users/activeProfile`, {
      profile: profileId
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
