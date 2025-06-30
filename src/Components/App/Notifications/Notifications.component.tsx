import { use, useRef, useState } from 'react'
import { FaBell } from 'react-icons/fa'

import { NO_NOTIFICATIONS } from '@/Consts/Notifications.const'

import { NotificationsContext } from '@/Contexts/Notifications.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'

import { NotificationItemComponent } from '@/Components/App/NotificationItem'

import './Notifications.style.scss'

export const NotificationsComponent = () => {
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
    <div className="notifications">
      <ButtonComponent
        transparent
        square
        onClick={toggleDropdown}
        active={isNotificationsOpen}
      >
        <FaBell />

        {!!notifications?.length && (
          <span className="notifications-counter">{notifications.length}</span>
        )}
      </ButtonComponent>

      <DropdownComponent ref={topbarNotificationsDropdownRef}>
        <div className="notifications-dropdown">
          {!notifications?.length && (
            <TypographyComponent renderAs="h2">
              {NO_NOTIFICATIONS}
            </TypographyComponent>
          )}

          {!!notifications?.length && (
            <ul className="notifications-list">
              {notifications.map((notificationItem) => (
                <NotificationItemComponent
                  key={`notification-item-${notificationItem.type}-${
                    notificationItem.otherProfile!._id
                  }`}
                  notification={notificationItem}
                />
              ))}
            </ul>
          )}
        </div>
      </DropdownComponent>
    </div>
  )
}
