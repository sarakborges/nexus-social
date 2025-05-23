import { use, useRef, useState } from 'react'
import { FaBell } from 'react-icons/fa'

import { NotificationsContext } from '@/Contexts/Notifications.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ButtonComponent } from '@/Components/System/Button'

import { NotificationItemComponent } from '@/Components/App/NotificationItem'

import './TopbarNotifications.style.scss'

export const TopbarNotificationsComponent = () => {
  const { notifications } = use(NotificationsContext)

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const topbarNotificationsDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!topbarNotificationsDropdownRef?.current) {
      return
    }

    setIsNotificationsOpen(!isNotificationsOpen)
    topbarNotificationsDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <div className="actions-dropdown-wrapper">
      <ButtonComponent
        square
        transparent
        onClick={toggleDropdown}
        active={isNotificationsOpen}
      >
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
