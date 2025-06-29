import { use, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

import { NOTIFICATION_TYPES } from '@/Consts/Notifications.const'

import { ProfileType } from '@/Types/Profile.type'

import * as ConnectionsAPI from '@/Apis/Connections'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { NotificationsContext } from '@/Contexts/Notifications.context'

import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'

export const DeleteConnectionComponent = ({
  profile,
  iconOnly
}: {
  profile: ProfileType
  iconOnly?: boolean
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
      connectionStatus: 'none',
      connections: profile?.connections?.filter(
        (connectionItem) => connectionItem._id !== connectionRequest
      )
    })

    setNotifications([
      ...notifications?.filter(
        (notificationItem) =>
          !(
            notificationItem.type === NOTIFICATION_TYPES.CONNECTION_REQUEST &&
            profile._id === notificationItem.otherProfile?._id
          )
      )
    ])
  }

  return (
    <>
      {profile?._id !== activeProfile?._id && (
        <>
          {profile?.connectionStatus === 'requested' &&
            activeProfile?._id !== profile?.requestedBy && (
              <ButtonComponent
                square={isLoading}
                cancel
                onClick={deleteConnection}
              >
                {!!isLoading && <LoadingComponent />}
                {!isLoading && !iconOnly && `Recusar conexão`}
                {!isLoading && !!iconOnly && <FaTimes />}
              </ButtonComponent>
            )}

          {profile?.connectionStatus === 'requested' &&
            activeProfile?._id === profile?.requestedBy && (
              <>
                <ButtonComponent
                  square={isLoading}
                  cancel
                  onClick={deleteConnection}
                >
                  {!!isLoading && <LoadingComponent />}
                  {!isLoading && !iconOnly && `Cancelar solicitação`}
                  {!isLoading && !!iconOnly && <FaTimes />}
                </ButtonComponent>
              </>
            )}

          {profile?.connectionStatus === 'connected' && (
            <ButtonComponent
              square={isLoading}
              cancel
              onClick={deleteConnection}
            >
              {!!isLoading && <LoadingComponent />}
              {!isLoading && !iconOnly && `Remover conexão`}
              {!isLoading && !!iconOnly && <FaTimes />}
            </ButtonComponent>
          )}
        </>
      )}
    </>
  )
}
