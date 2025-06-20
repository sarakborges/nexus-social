import { ProfileType } from '@/Types/Profile.type'

export type ConnectionsType = {
  _id: string
  requestedBy: string
  between: Array<string>
  status: 'connected' | 'requested'
  requestedConnectionAt?: Date
  connectedSince?: Date
  otherProfileId: string
  otherProfile: ProfileType
}
