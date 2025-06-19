import { ProfileType } from '@/Types/Profile.type'

export type FeedType = {
  _id: string
  content?: string
  picture?: string
  createdAt: Date
  profileId: string
  profile: ProfileType
}
