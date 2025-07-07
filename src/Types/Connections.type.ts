import { CONNECTION_STATUS } from '@/Consts/Connections.const'

import { ProfileType } from '@/Types/Profile.type'

export type ConnectionsType = {
  _id: string
  requestedBy: string
  between: Array<string>
  status:
    | typeof CONNECTION_STATUS.connected
    | typeof CONNECTION_STATUS.requested
  requestedConnectionAt?: Date
  connectedSince?: Date
  otherProfileId: string
  otherProfile: ProfileType
}
