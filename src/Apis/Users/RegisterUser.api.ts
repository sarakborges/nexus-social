import axios from 'axios'

import { ProfileType } from '@/Types/Profile.type'

export const registerUser = async ({
  email,
  password,
  profile
}: {
  email: string
  password: string
  profile: ProfileType
}) => {
  const userRequest = await axios.post(
    `https://nexus-server-woad.vercel.app/users`,
    {
      email,
      password,
      profiles: [profile],
      activeProfile: '1'
    }
  )

  const { status, data } = userRequest

  if (status !== 201) {
    return
  }

  return data
}
