import { use, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

import { ProfileType } from '@/Types/Profile.type'
import { ConnectionsType } from '@/Types/Connections.type'

import * as ConnectionsAPI from '@/Apis/Connections'

import { getTexts } from '@/Texts'

import { NOTIFICATION_TYPES } from '@/Consts/Notifications.const'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { NotificationsContext } from '@/Contexts/Notifications.context'

import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'
import { CONNECTION_STATUS } from '@/Consts/Connections.const'

export const AcceptConnectionComponent = ({
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

  const acceptConnection = async () => {
    setIsLoading(true)
    const connectionRequest = await ConnectionsAPI.acceptConnection(
      profile?._id
    )
    setIsLoading(false)

    if (!connectionRequest?._id) {
      return
    }

    const newConnection: ConnectionsType = {
      _id: connectionRequest?._id,
      status: CONNECTION_STATUS.connected,
      between: [profile?._id, activeProfile?._id],
      requestedBy: profile?._id,
      otherProfileId: activeProfile?._id,
      otherProfile: { ...activeProfile }
    }

    let profileConnectionsList: Array<ConnectionsType> = []
    if (profile?.connections?.length && profile?.connections?.length > 2) {
      profileConnectionsList = [...profile?.connections]
    } else {
      profileConnectionsList = !!profile?.connections?.length
        ? [...profile?.connections, newConnection]
        : [newConnection]
    }

    setProfile({
      ...profile,
      connectionStatus: CONNECTION_STATUS.connected,
      connections: profileConnectionsList
    })

    setNotifications([
      ...notifications?.filter(
        (notificationItem) =>
          !(
            [NOTIFICATION_TYPES.CONNECTION_REQUEST].includes(
              notificationItem.type
            ) && notificationItem?._id === notificationId
          )
      )
    ])
  }

  return (
    <>
      {profile?.connectionStatus === CONNECTION_STATUS.requested &&
        activeProfile?._id !== profile?.requestedBy && (
          <ButtonComponent square={isLoading} onClick={acceptConnection}>
            {!!isLoading && <LoadingComponent />}
            {!isLoading && !iconOnly && getTexts('CONNECTIONS_ACCEPT')}
            {!isLoading && !!iconOnly && <FaCheck />}
          </ButtonComponent>
        )}
    </>
  )
}
