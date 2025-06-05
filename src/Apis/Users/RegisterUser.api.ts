import axios from 'axios'

import { UserType } from '@/Types/User.type'

export const registerUser = async (user: Partial<UserType>) => {
  const userRequest = await axios.post(
    `https://nexus-server-dam7.onrender.com/users`,
    user
  )

  const { status, data } = userRequest

  if (status !== 201) {
    return
  }

  return data
}
