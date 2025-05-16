import { UserType } from '@/Types/User.type'

export type UserContextType = {
  user: UserType
  setUser: (newUser: UserType) => void
}
