import axios from 'axios'

export const loginUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  try {
    const userRequest = await axios.post(
      `https://nexus-server-dam7.onrender.com/users/auth/login`,
      { email, password }
    )

    const { status, data } = userRequest

    if (status !== 200) {
      return
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
