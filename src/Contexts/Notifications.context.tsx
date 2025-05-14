import { createContext, useState } from 'react'

import { NotificationType } from '@/Types/Notification.type'

import { NOTIFICATION_TYPES } from '@/Consts/Notifications.const'
import { NotificationsListType } from '@/Types/NotificationsList.type'

const INITIAL_NOTIFICATIONS: NotificationType[] = [
  {
    id: '1',
    type: NOTIFICATION_TYPES.CONNECTION_REQUEST,
    date: new Date('2025-05-01 07:15:00'),
    profile: {
      id: '1',
      name: 'hope.',
      uri: 'hopyumm',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/first-blood67e450dcccc7c.png`,
      connectionsInCommon: 3
    }
  },

  {
    id: '2',
    type: NOTIFICATION_TYPES.ACCEPTED_AT_GROUP,
    date: new Date('2025-05-04 21:30:00'),
    group: {
      id: '1',
      name: 'add condomínio de piranhas',
      uri: 'condominio-piranhas',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/community/281766/photo/add-condominio-de-piranhas6801da3a12299.png`
    }
  }
]

const NotificationsContext = createContext<NotificationsListType | null>(null)

const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>(
    INITIAL_NOTIFICATIONS
  )

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export { NotificationsProvider, NotificationsContext }
