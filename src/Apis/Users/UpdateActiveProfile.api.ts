import { request } from '@/Apis/Request.api'

export const updateActiveProfile = async ({
  profileId,
  userId
}: {
  profileId: string
  userId: string
}) => {
  try {
    const profilesRequest = await request.patch(
      `/users/${userId}/activeProfile`,
      {
        profile: profileId
      }
    )

    const { status } = profilesRequest

    if (status !== 200) {
      return false
    }

    return true
  } catch (e) {
    console.log(e)
  }
}
