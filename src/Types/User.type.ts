import { ProfileType } from '@/Types/Profile.type'

export type UserType = {
  _id: string
  email: string
  password: string
  activeProfile?: string
  profiles?: Array<ProfileType>
}
