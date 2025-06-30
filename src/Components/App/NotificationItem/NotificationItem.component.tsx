import { use } from 'react'

import { NotificationType } from '@/Types/Notification.type'

import { ROUTES } from '@/Consts/Routes.const'
import {
  NOTIFICATION_TITLES,
  NOTIFICATION_TYPES
} from '@/Consts/Notifications.const'

import { ProfileType } from '@/Types/Profile.type'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

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
  const { activeProfile } = use(ActiveProfileContext)
  const profile =
    notification.from._id !== activeProfile?._id
      ? notification.from
      : notification.to

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
      linkUri: linkUri.path.replace(':uri', profile?.uri || ''),
      name: profile?.name,

      pictureProps: {
        src: profile?.picture,
        alt: profile?.name
      }
    }
  }

  const { linkUri, name, pictureProps } = getNotificationProps()

  const notificationDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(notification.at))

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
              notificationId={notification._id}
              profile={{
                ...(profile as ProfileType),
                connectionStatus: 'requested',
                requestedBy: profile._id
              }}
            />

            <DeleteConnectionComponent
              iconOnly
              notificationId={notification._id}
              profile={{
                ...(profile as ProfileType),
                connectionStatus: 'requested',
                requestedBy: profile._id
              }}
            />
          </>
        )}
      </section>
    </li>
  )
}
