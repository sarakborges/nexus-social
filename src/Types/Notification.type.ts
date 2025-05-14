import { NOTIFICATION_TYPES } from '@/Consts/Notifications.const'

import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from './Group.type'

export type NotificationType = {
  id: string
  type: typeof NOTIFICATION_TYPES.CONNECTION_REQUEST
  profile?: ProfileType
  group?: GroupType
  date: Date
}
