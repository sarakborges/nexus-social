import axios from 'axios'

export const registerUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const userRequest = await axios.post(`http://localhost:3000/users`, {
    email,
    password
  })

  const { status, data } = userRequest

  if (status !== 201) {
    return
  }

  return data
}
