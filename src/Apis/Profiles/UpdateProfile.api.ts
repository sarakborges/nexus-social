import { request } from '@/Apis/Request.api'

import { ProfileType } from '@/Types/Profile.type'

export const updateProfile = async (profile: Partial<ProfileType>) => {
  try {
    const { _id, ...profileRest } = profile

    const profileRequest = await request.patch(`/profiles/${_id}`, profileRest)

    const { status, data } = profileRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
