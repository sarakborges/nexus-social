import { NotificationType } from '@/Types/Notification.type'

export type NotificationsListType = {
  notifications: NotificationType[]
  setNotifications: (newNotifications: NotificationType[]) => void
}
