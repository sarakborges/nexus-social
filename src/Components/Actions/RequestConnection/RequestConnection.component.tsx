import { use, useState } from 'react'

import * as ConnectionsAPI from '@/Apis/Connections'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'

export const RequestConnectionComponent = () => {
  const { profile, setProfile } = use(ProfileContext)
  const { activeProfile } = use(ActiveProfileContext)

  const [isLoading, setIsLoading] = useState(false)

  if (!profile) {
    return <></>
  }

  const requestConnection = async () => {
    setIsLoading(true)
    const connectionRequest = await ConnectionsAPI.createConnection(
      profile?._id
    )
    setIsLoading(false)

    if (!connectionRequest?._id) {
      return
    }

    setProfile({
      ...profile,
      connectionStatus: 'requested',
      requestedBy: activeProfile?._id
    })
  }

  return (
    <>
      {profile?.connectionStatus === 'none' && (
        <ButtonComponent onClick={requestConnection}>
          {!!isLoading && <LoadingComponent />}
          {!isLoading && `Conectar-se`}
        </ButtonComponent>
      )}
    </>
  )
}
