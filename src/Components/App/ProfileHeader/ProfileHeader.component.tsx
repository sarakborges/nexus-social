import { use } from 'react'
import { MdMoreHoriz } from 'react-icons/md'

import { ProfileContext } from '@/Contexts/Profile.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'
import { ButtonComponent } from '@/Components/System/Button'

import { ProfileHeaderLinksComponent } from '@/Components/App/ProfileHeaderLinks'

import { RequestConnectionComponent } from '@/Components/Actions/RequestConnection'
import { DeleteConnectionComponent } from '@/Components/Actions/DeleteConnection'
import { AcceptConnectionComponent } from '@/Components/Actions/AcceptConnection'

import './ProfileHeader.style.scss'

export const ProfileHeaderComponent = () => {
  const { profile } = use(ProfileContext)
  const { activeProfile } = use(ActiveProfileContext)

  if (!profile) {
    return <></>
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
            <AcceptConnectionComponent />
            <RequestConnectionComponent />
            <DeleteConnectionComponent />

            <ButtonComponent square transparent>
              <MdMoreHoriz />
            </ButtonComponent>
          </section>
        )}
      </main>
    </header>
  )
}
