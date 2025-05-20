import axios from 'axios'

export const registerUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const userRequest = await axios.post(
    `https://nexus-server-woad.vercel.app/users`,
    {
      email,
      password
    }
  )

  const { status, data } = userRequest

  if (status !== 201) {
    return
  }

  return data
}
