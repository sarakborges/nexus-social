import { createContext, useState } from 'react'

import { NotificationType } from '@/Types/Notification.type'

import { NOTIFICATION_TYPES } from '@/Consts/Notifications.const'
import { NotificationsListType } from '@/Types/NotificationsList.type'

const INITIAL_FEED: NotificationType[] = [
  {
    id: '1',
    type: NOTIFICATION_TYPES.CONNECTION_REQUEST,
    profile: {
      id: '1',
      name: 'hope.',
      uri: 'hopyumm',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/first-blood67e450dcccc7c.png`,
      connectionsInCommon: 3
    }
  }
]

const NotificationsContext = createContext<NotificationsListType | null>(null)

const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] =
    useState<NotificationType[]>(INITIAL_FEED)

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationsContext.Provider>
  )
}

export { NotificationsProvider, NotificationsContext }
