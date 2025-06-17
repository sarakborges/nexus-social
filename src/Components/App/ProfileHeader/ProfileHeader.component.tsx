import { use } from 'react'

import { ProfileContext } from '@/Contexts/Profile.context'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'

import { ProfileHeaderLinksComponent } from '@/Components/App/ProfileHeaderLinks'

import './ProfileHeader.style.scss'

export const ProfileHeaderComponent = () => {
  const { profile } = use(ProfileContext)

  if (!profile) {
    return <></>
  }

  return (
    <header>
      <ImageComponent
        src={profile?.picture || `/avatar-placeholder.png`}
        alt={profile?.name}
        rounded
        square
      />

      <main>
        <TypographyComponent renderAs="h1">{profile?.name}</TypographyComponent>

        <TypographyComponent renderAs="h2">{`@${profile?.uri}`}</TypographyComponent>

        <TypographyComponent renderAs="p">{profile?.bio}</TypographyComponent>

        <ProfileHeaderLinksComponent />
      </main>
    </header>
  )
}
