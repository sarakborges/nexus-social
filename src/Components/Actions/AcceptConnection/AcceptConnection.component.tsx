import { use, useState } from 'react'

import * as ConnectionsAPI from '@/Apis/Connections'

import { ConnectionsType } from '@/Types/Connections.type'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'

export const AcceptConnectionComponent = () => {
  const { profile, setProfile } = use(ProfileContext)
  const { activeProfile } = use(ActiveProfileContext)

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
      status: 'connected',
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
      connectionStatus: 'connected',
      connections: profileConnectionsList
    })
  }

  return (
    <>
      {profile?.connectionStatus === 'requested' &&
        activeProfile?._id !== profile?.requestedBy && (
          <ButtonComponent onClick={acceptConnection}>
            {!!isLoading && <LoadingComponent />}
            {!isLoading && `Aceitar conexão`}
          </ButtonComponent>
        )}
    </>
  )
}
