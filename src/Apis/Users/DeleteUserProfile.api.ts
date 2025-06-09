import { request } from '@/Apis/Request.api'

export const deleteUserProfile = async ({
  profileId,
  userId
}: {
  profileId: number
  userId: number
}) => {
  try {
    const profilesRequest = await request.patch(`/users/${userId}/remove`, {
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
