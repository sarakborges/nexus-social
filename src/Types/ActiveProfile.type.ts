import { ProfileType } from '@/Types/Profile.type'

export type ActiveProfileType = {
  activeProfile: ProfileType
  setActiveProfile: (newProfile: ProfileType) => void
}
