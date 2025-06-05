import { ProfileType } from '@/Types/Profile.type'

export type UserType = {
  id: number
  email: string
  password: string
  activeProfile?: number
  profiles?: Array<ProfileType>
}
