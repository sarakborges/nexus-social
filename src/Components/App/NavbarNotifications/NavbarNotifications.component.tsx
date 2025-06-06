import { use, useRef, useState } from 'react'
import { FaBell } from 'react-icons/fa'

import { NotificationsContext } from '@/Contexts/Notifications.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'

import { NotificationItemComponent } from '@/Components/App/NotificationItem'

import './NavbarNotifications.style.scss'

export const NavbarNotificationsComponent = () => {
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
    <div className="navbar-notifications">
      <ButtonComponent
        transparent
        onClick={toggleDropdown}
        active={isNotificationsOpen}
      >
        <FaBell />
        <TypographyComponent>Notificações</TypographyComponent>
        <span className="notifications-counter">{notifications.length}</span>
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
