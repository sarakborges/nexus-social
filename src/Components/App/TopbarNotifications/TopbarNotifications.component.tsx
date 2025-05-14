import { use, useRef } from 'react'
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa'

import { NotificationsContext } from '@/Contexts/Notifications.context'

import { ROUTES } from '@/Consts/Routes.const'
import {
  NOTIFICATION_CONNECTIONS_IN_COMMON,
  NOTIFICATION_TITLES,
  NOTIFICATION_TYPES
} from '@/Consts/Notifications.const'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ButtonComponent } from '@/Components/System/Button'
import { LinkComponent } from '@/Components/System/Link'
import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'

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
        <span className="notifications-counter">3</span>
        <FaBell />
      </ButtonComponent>

      <DropdownComponent ref={topbarNotificationsDropdownRef}>
        <ul className="notifications-dropdown">
          {notifications.map((notificationItem) => (
            <li key={notificationItem.profile.uri}>
              <LinkComponent
                to={ROUTES.PROFILE.path.replace(
                  ':id',
                  notificationItem.profile.uri
                )}
              >
                <ImageComponent
                  src={
                    notificationItem.profile.picture ||
                    '/avatar-placeholder.png'
                  }
                  alt={notificationItem.profile.name}
                  rounded
                  square
                />
              </LinkComponent>

              <section className="notification-profile">
                <TypographyComponent renderAs="span">
                  {NOTIFICATION_TITLES[notificationItem.type]}
                </TypographyComponent>

                <p>
                  <LinkComponent
                    to={ROUTES.PROFILE.path.replace(
                      ':id',
                      notificationItem.profile.uri
                    )}
                  >
                    {notificationItem.profile.name}
                  </LinkComponent>
                </p>

                {notificationItem.type ===
                  NOTIFICATION_TYPES.CONNECTION_REQUEST && (
                  <TypographyComponent renderAs="span" smallText>
                    {NOTIFICATION_CONNECTIONS_IN_COMMON.replace(
                      ':number',
                      String(notificationItem.profile.connectionsInCommon)
                    )}
                  </TypographyComponent>
                )}
              </section>

              <section className="notification-actions">
                <ButtonComponent square>
                  <FaCheck />
                </ButtonComponent>

                <ButtonComponent square cancel>
                  <FaTimes />
                </ButtonComponent>
              </section>
            </li>
          ))}
        </ul>
      </DropdownComponent>
    </div>
  )
}
