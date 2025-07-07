import { CONNECTION_STATUS } from '@/Consts/Connections.const'

import { ConnectionsType } from '@/Types/Connections.type'
import { GroupType } from '@/Types/Group.type'

export type ProfileFormType = {
  _id: string
  userId: string
  name: string
  uri: string
  picture?: string
  bio?: string
}

export type ProfileType = ProfileFormType & {
  links?: Array<{
    label: string
    uri: string
  }>
  connectionsInCommon?: number
  connections?: Array<ConnectionsType>
  groups?: Array<GroupType>
  connectionStatus?:
    | typeof CONNECTION_STATUS.connected
    | typeof CONNECTION_STATUS.requested
    | typeof CONNECTION_STATUS.none
  requestedBy?: string
}
