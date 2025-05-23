import { ProfileType } from '@/Types/Profile.type'

export type FeedType = {
  id: string
  content?: string
  picture?: string
  date: Date
  profile: ProfileType
}
