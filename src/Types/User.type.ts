import { ProfileType } from '@/Types/Profile.type'

export type UserType = {
  id: string
  profiles?: Array<ProfileType>
}
