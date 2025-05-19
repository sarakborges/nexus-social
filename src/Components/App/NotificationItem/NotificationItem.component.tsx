import { FaCheck, FaTimes } from 'react-icons/fa'

import { NotificationType } from '@/Types/Notification.type'

import { ROUTES } from '@/Consts/Routes.const'
import {
  NOTIFICATION_TITLES,
  NOTIFICATION_TYPES
} from '@/Consts/Notifications.const'

import { ButtonComponent } from '@/Components/System/Button'
import { LinkComponent } from '@/Components/System/Link'
import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'

import './NotificationItem.style.scss'

export const NotificationItemComponent = ({
  notification
}: {
  notification: NotificationType
}) => {
  const getNotificationProps = () => {
    let linkUri

    const notificationPropsTypes = {
      [NOTIFICATION_TYPES.CONNECTION_REQUEST]: 'profile',
      [NOTIFICATION_TYPES.CONNECTION_ACCEPTED]: 'profile',
      [NOTIFICATION_TYPES.ACCEPTED_AT_GROUP]: 'group'
    }

    const notificationProps =
      notification[notificationPropsTypes[notification.type]]

    if (notification.type === NOTIFICATION_TYPES.CONNECTION_REQUEST) {
      linkUri = ROUTES.PROFILE
    }

    if (notification.type === NOTIFICATION_TYPES.CONNECTION_ACCEPTED) {
      linkUri = ROUTES.PROFILE
    }

    if (notification.type === NOTIFICATION_TYPES.ACCEPTED_AT_GROUP) {
      linkUri = ROUTES.GROUP
    }

    return {
      linkUri: linkUri.path.replace(':id', notificationProps.uri || ''),
      name: notificationProps.name,

      pictureProps: {
        src: notificationProps.picture,
        alt: notificationProps.name
      }
    }
  }

  const { linkUri, name, pictureProps } = getNotificationProps()

  const notificationDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(notification.date)

  return (
    <li className="notification-item">
      <LinkComponent to={linkUri!}>
        <ImageComponent
          src={pictureProps?.src || '/avatar-placeholder.png'}
          alt={pictureProps?.alt || ''}
          rounded
          square
        />
      </LinkComponent>

      <section className="notification-profile">
        <TypographyComponent>
          {NOTIFICATION_TITLES[notification.type]}
        </TypographyComponent>

        <p>
          <LinkComponent to={linkUri!}>{name}</LinkComponent>
        </p>

        <TypographyComponent smallText>{notificationDate}</TypographyComponent>
      </section>

      <section className="notification-actions">
        {notification.type === NOTIFICATION_TYPES.CONNECTION_REQUEST && (
          <>
            <ButtonComponent square>
              <FaCheck />
            </ButtonComponent>

            <ButtonComponent square cancel>
              <FaTimes />
            </ButtonComponent>
          </>
        )}
      </section>
    </li>
  )
}
