import { use } from 'react'

import { ProfileContext } from '@/Contexts/Profile.context'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'

import { ProfileHeaderLinksComponent } from '@/Components/App/ProfileHeaderLinks'

import './ProfileHeader.style.scss'
import { ButtonComponent } from '@/Components/System/Button'
import { MdMoreHoriz } from 'react-icons/md'

export const ProfileHeaderComponent = () => {
  const { profile } = use(ProfileContext)

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

        <section className="profile-actions">
          <ButtonComponent>Conectar</ButtonComponent>

          <ButtonComponent square transparent>
            <MdMoreHoriz />
          </ButtonComponent>
        </section>
      </main>
    </header>
  )
}
