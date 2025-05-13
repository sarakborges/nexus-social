import { useRef } from 'react'
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa'

import { ROUTES } from '@/Consts/Routes.const'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ButtonComponent } from '@/Components/System/Button'
import { LinkComponent } from '@/Components/System/Link'
import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'

import './TopbarNotifications.style.scss'

export const TopbarNotificationsComponent = () => {
  const topbarNotificationsDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!topbarNotificationsDropdownRef?.current) {
      return
    }

    topbarNotificationsDropdownRef?.current?.toggleDropdown(e)
  }

  const notifications = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'hope.',
        uri: 'hopyumm',
        picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/first-blood67e450dcccc7c.png`,
        connectionsInCommon: 3
      },
      type: 'connectionRequest'
    }
  ]

  return (
    <div className="actions-dropdown-wrapper">
      <ButtonComponent square transparent onClick={toggleDropdown}>
        <span className="notifications-counter">3</span>
        <FaBell />
      </ButtonComponent>

      <DropdownComponent ref={topbarNotificationsDropdownRef}>
        <ul className="notifications-dropdown">
          {notifications.map((notificationItem) => (
            <li key={notificationItem.user.uri}>
              <LinkComponent
                to={ROUTES.PROFILE.path.replace(
                  ':id',
                  notificationItem.user.uri
                )}
              >
                <ImageComponent
                  src={
                    notificationItem.user.picture || '/avatar-placeholder.png'
                  }
                  alt={notificationItem.user.name}
                  rounded
                  square
                />
              </LinkComponent>

              <section className="notification-profile">
                <TypographyComponent renderAs="span">
                  Conexão solicitada
                </TypographyComponent>

                <LinkComponent
                  to={ROUTES.PROFILE.path.replace(
                    ':id',
                    notificationItem.user.uri
                  )}
                >
                  {notificationItem.user.name}
                </LinkComponent>

                <TypographyComponent renderAs="span" smallText>
                  {`${notificationItem.user.connectionsInCommon} conexões em comun`}
                </TypographyComponent>
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
