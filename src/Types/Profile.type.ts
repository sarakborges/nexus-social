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
}
