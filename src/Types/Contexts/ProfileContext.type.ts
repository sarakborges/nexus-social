import { ProfileType } from '@/Types/Profile.type'

export type ProfileContextType = {
  profile: ProfileType
  setProfile: (newProfile: ProfileType) => void
}
