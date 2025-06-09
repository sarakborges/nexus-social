import { request } from '@/Apis/Request.api'

import { ProfileType } from '@/Types/Profile.type'

export const createProfile = async (profile: Partial<ProfileType>) => {
  try {
    const profileRequest = await request.post(`/profiles`, profile)

    const { status, data } = profileRequest

    if (status !== 201) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
