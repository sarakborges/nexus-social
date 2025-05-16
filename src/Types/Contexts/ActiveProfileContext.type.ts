import { ProfileType } from '@/Types/Profile.type'

export type ActiveProfileContextType = {
  activeProfile: ProfileType
  setActiveProfile: (newProfile: ProfileType) => void
}
