import { use, useRef } from 'react'
import { FaBell } from 'react-icons/fa'

import { NotificationsContext } from '@/Contexts/Notifications.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ButtonComponent } from '@/Components/System/Button'

import { NotificationItemComponent } from '@/Components/App/NotificationItem'

import './TopbarNotifications.style.scss'

export const TopbarNotificationsComponent = () => {
  const notificationsContext = use(NotificationsContext)

  if (!notificationsContext?.notifications) {
    return <></>
  }

  const { notifications } = notificationsContext

  const topbarNotificationsDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!topbarNotificationsDropdownRef?.current) {
      return
    }

    topbarNotificationsDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <div className="actions-dropdown-wrapper">
      <ButtonComponent square transparent onClick={toggleDropdown}>
        <span className="notifications-counter">{notifications.length}</span>
        <FaBell />
      </ButtonComponent>

      <DropdownComponent ref={topbarNotificationsDropdownRef}>
        <ul className="notifications-list">
          {notifications.map((notificationItem) => (
            <NotificationItemComponent
              key={`notification-item-${notificationItem.id}`}
              notification={notificationItem}
            />
          ))}
        </ul>
      </DropdownComponent>
    </div>
  )
}
