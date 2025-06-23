import axios from 'axios'

import { UserType } from '@/Types/User.type'

export const registerUser = async (user: Partial<UserType>) => {
  try {
    const userRequest = await axios.post(
      `https://nexus-server-dam7.onrender.com/auth/register`,
      user
    )

    const { status, data } = userRequest

    if (status !== 201) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
