import { NotificationType } from '@/Types/Notification.type'

export type NotificationsContextType = {
  notifications: NotificationType[]
  setNotifications: (newNotifications: NotificationType[]) => void
}
