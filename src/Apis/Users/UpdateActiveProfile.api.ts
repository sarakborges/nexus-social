import { request } from '@/Apis/Request.api'

export const updateActiveProfile = async ({
  profileId,
  userId
}: {
  profileId: number
  userId: number
}) => {
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
}
