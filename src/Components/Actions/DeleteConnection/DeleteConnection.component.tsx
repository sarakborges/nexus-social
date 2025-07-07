import { use, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import { ProfileType } from '@/Types/Profile.type'

import * as ConnectionsAPI from '@/Apis/Connections'

import { getTexts } from '@/Texts'

import { NOTIFICATION_TYPES } from '@/Consts/Notifications.const'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { NotificationsContext } from '@/Contexts/Notifications.context'

import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'
import { CONNECTION_STATUS } from '@/Consts/Connections.const'

export const DeleteConnectionComponent = ({
  profile,
  iconOnly,
  notificationId
}: {
  profile: ProfileType
  iconOnly?: boolean
  notificationId?: string
}) => {
  const { setProfile } = use(ProfileContext)
  const { activeProfile } = use(ActiveProfileContext)
  const { notifications, setNotifications } = use(NotificationsContext)

  const [isLoading, setIsLoading] = useState(false)

  if (!profile) {
    return <></>
  }

  const deleteConnection = async () => {
    setIsLoading(true)
    const connectionRequest = await ConnectionsAPI.deleteConnection(
      profile?._id
    )
    setIsLoading(false)

    if (!connectionRequest) {
      return
    }

    setProfile({
      ...profile,
      connectionStatus: CONNECTION_STATUS.none,
      connections: profile?.connections?.filter(
        (connectionItem) => connectionItem._id !== connectionRequest
      )
    })

    setNotifications([
      ...notifications?.filter((notificationItem) => {
        return !(
          [NOTIFICATION_TYPES.CONNECTION_REQUEST].includes(
            notificationItem.type
          ) && notificationItem?._id === notificationId
        )
      })
    ])
  }

  return (
    <>
      {profile?._id !== activeProfile?._id && (
        <>
          {profile?.connectionStatus === CONNECTION_STATUS.requested &&
            activeProfile?._id !== profile?.requestedBy && (
              <ButtonComponent
                square={isLoading}
                cancel
                onClick={deleteConnection}
              >
                {!!isLoading && <LoadingComponent />}
                {!isLoading && !iconOnly && getTexts('CONNECTIONS_REFUSE')}
                {!isLoading && !!iconOnly && <FaTimes />}
              </ButtonComponent>
            )}

          {profile?.connectionStatus === CONNECTION_STATUS.requested &&
            activeProfile?._id === profile?.requestedBy && (
              <>
                <ButtonComponent
                  square={isLoading}
                  cancel
                  onClick={deleteConnection}
                >
                  {!!isLoading && <LoadingComponent />}
                  {!isLoading && !iconOnly && getTexts('CONNECTIONS_CANCEL')}
                  {!isLoading && !!iconOnly && <FaTimes />}
                </ButtonComponent>
              </>
            )}

          {profile?.connectionStatus === CONNECTION_STATUS.connected && (
            <ButtonComponent
              square={isLoading}
              cancel
              onClick={deleteConnection}
            >
              {!!isLoading && <LoadingComponent />}
              {!isLoading && !iconOnly && getTexts('CONNECTIONS_REMOVE')}
              {!isLoading && !!iconOnly && <FaTimes />}
            </ButtonComponent>
          )}
        </>
      )}
    </>
  )
}
