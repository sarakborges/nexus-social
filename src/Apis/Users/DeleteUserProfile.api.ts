import { request } from '@/Apis/Request.api'

import { UserType } from '@/Types/User.type'

export const deleteUserProfile = async ({
  profileId,
  user
}: {
  profileId: string
  user: UserType
}) => {
  const profilesRequest = await request.put(`/users/${user.id}`, {
    ...user,
    activeProfile:
      user.activeProfile === profileId ? undefined : user.activeProfile,
    profiles: user.profiles?.filter(
      (profileItem) => profileItem.id !== profileId
    )
  })

  const { status } = profilesRequest

  if (status !== 200) {
    return false
  }

  return true
}
