import axios from 'axios'

import { setFilters } from '@/Apis/Request.api'

export const loginUser = async ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  const userRequest = await axios.get(
    `http://localhost:3000/users${setFilters({ params: { email, password } })}`
  )

  const { status, data } = userRequest

  if (status !== 200) {
    return
  }

  return data[0]
}
