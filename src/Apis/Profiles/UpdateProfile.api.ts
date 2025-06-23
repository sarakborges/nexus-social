import { request } from '@/Apis/Request.api'

import { ProfileType } from '@/Types/Profile.type'

export const updateProfile = async (profile: Partial<ProfileType>) => {
  try {
    const profileRequest = await request.patch(`/profiles`, profile)

    const { status, data } = profileRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
