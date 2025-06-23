import { use, useState } from 'react'

import * as ConnectionsAPI from '@/Apis/Connections'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'

export const DeleteConnectionComponent = () => {
  const { profile, setProfile } = use(ProfileContext)
  const { activeProfile } = use(ActiveProfileContext)

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
  }

  return (
    <>
      {profile?._id !== activeProfile?._id && (
        <>
          {profile?.connectionStatus === 'requested' &&
            activeProfile?._id !== profile?.requestedBy && (
              <ButtonComponent cancel onClick={deleteConnection}>
                {!!isLoading && <LoadingComponent />}
                {!isLoading && `Recusar conexão`}
              </ButtonComponent>
            )}

          {profile?.connectionStatus === 'requested' &&
            activeProfile?._id === profile?.requestedBy && (
              <>
                <ButtonComponent cancel onClick={deleteConnection}>
                  {!!isLoading && <LoadingComponent />}
                  {!isLoading && `Cancelar solicitação`}
                </ButtonComponent>
              </>
            )}

          {profile?.connectionStatus === 'connected' && (
            <ButtonComponent cancel onClick={deleteConnection}>
              {!!isLoading && <LoadingComponent />}
              {!isLoading && `Remover conexão`}
            </ButtonComponent>
          )}
        </>
      )}
    </>
  )
}
