import { use, useState } from 'react'
import { MdMoreHoriz } from 'react-icons/md'

import * as ConnectionsAPI from '@/Apis/Connections'

import { ConnectionsType } from '@/Types/Connections.type'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'
import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'

import { ProfileHeaderLinksComponent } from '@/Components/App/ProfileHeaderLinks'

import './ProfileHeader.style.scss'

export const ProfileHeaderComponent = () => {
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

  const deleteConnection = async () => {
    setIsLoading(true)
    const connectionRequest = await ConnectionsAPI.deleteConnection(
      profile?._id
    )
    setIsLoading(false)

    if (!connectionRequest?._id) {
      return
    }

    setProfile({
      ...profile,
      connectionStatus: 'none',
      connections: profile?.connections?.filter(
        (connectionItem) => connectionItem._id !== connectionRequest?._id
      )
    })
  }

  return (
    <header className="profile-header">
      <section className="profile-header-picture">
        <ImageComponent
          src={profile?.picture || `/avatar-placeholder.png`}
          alt={profile?.name}
          rounded
          square
        />
      </section>

      <main>
        <section className="profile-name">
          <TypographyComponent renderAs="h1">
            {profile?.name}
          </TypographyComponent>

          <TypographyComponent renderAs="h3">{`@${profile?.uri}`}</TypographyComponent>
        </section>

        <TypographyComponent renderAs="p">{profile?.bio}</TypographyComponent>

        <ProfileHeaderLinksComponent />

        {profile?._id !== activeProfile?._id && (
          <section className="profile-actions">
            {profile?.connectionStatus === 'none' && (
              <ButtonComponent onClick={requestConnection}>
                {!!isLoading && <LoadingComponent />}
                {!isLoading && `Conectar-se`}
              </ButtonComponent>
            )}

            {profile?.connectionStatus === 'requested' &&
              activeProfile?._id !== profile?.requestedBy && (
                <>
                  <ButtonComponent onClick={acceptConnection}>
                    {!!isLoading && <LoadingComponent />}
                    {!isLoading && `Aceitar conexão`}
                  </ButtonComponent>

                  <ButtonComponent cancel onClick={deleteConnection}>
                    {!!isLoading && <LoadingComponent />}
                    {!isLoading && `Recusar conexão`}
                  </ButtonComponent>
                </>
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

            <ButtonComponent square transparent>
              <MdMoreHoriz />
            </ButtonComponent>
          </section>
        )}
      </main>
    </header>
  )
}
