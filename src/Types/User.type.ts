import { ProfileType } from '@/Types/Profile.type'

export type UserType = {
  id: string
  activeProfile?: string
  profiles?: Array<ProfileType>
}
