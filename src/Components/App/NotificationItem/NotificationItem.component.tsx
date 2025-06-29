import { NotificationType } from '@/Types/Notification.type'

import { ROUTES } from '@/Consts/Routes.const'
import {
  NOTIFICATION_TITLES,
  NOTIFICATION_TYPES
} from '@/Consts/Notifications.const'

import { LinkComponent } from '@/Components/System/Link'
import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'

import { AcceptConnectionComponent } from '@/Components/Actions/AcceptConnection'
import { DeleteConnectionComponent } from '@/Components/Actions/DeleteConnection'

import './NotificationItem.style.scss'

export const NotificationItemComponent = ({
  notification
}: {
  notification: NotificationType
}) => {
  const getNotificationProps = () => {
    let linkUri

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
      linkUri: linkUri.path.replace(
        ':uri',
        notification.otherProfile?.uri || ''
      ),
      name: notification.otherProfile?.name,

      pictureProps: {
        src: notification.otherProfile?.picture,
        alt: notification.otherProfile?.name
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
            <AcceptConnectionComponent
              iconOnly
              profile={{
                ...notification.otherProfile!,
                connectionStatus: 'requested',
                requestedBy: notification.otherProfile!._id
              }}
            />

            <DeleteConnectionComponent
              iconOnly
              profile={{
                ...notification.otherProfile!,
                connectionStatus: 'requested',
                requestedBy: notification.otherProfile!._id
              }}
            />
          </>
        )}
      </section>
    </li>
  )
}
