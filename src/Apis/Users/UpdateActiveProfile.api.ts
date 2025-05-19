import { request } from '@/Apis/Request.api'

import { UserType } from '@/Types/User.type'

export const updateActiveProfile = async ({
  profileId,
  user
}: {
  profileId: string
  user: UserType
}) => {
  const profilesRequest = await request.put(`/users/${user.id}`, {
    ...user,
    activeProfile: profileId
  })

  const { status } = profilesRequest

  if (status !== 200) {
    return false
  }

  return true
}
