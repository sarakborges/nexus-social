import { request } from '@/Apis/Request.api'

export const addProfileToUser = async ({
  userId,
  profile
}: {
  userId: number
  profile: number
}) => {
  const userRequest = await request.patch(`/users/${userId}/add`, {
    userId,
    profile
  })

  const { status } = userRequest

  if (status !== 200) {
    return
  }

  return true
}
