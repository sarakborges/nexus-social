import { use } from 'react'

import { ROUTES } from '@/Consts/Routes.const'

import { ProfileContext } from '@/Contexts/Profile.context'

import { LinkComponent } from '@/Components/System/Link'
import { TypographyComponent } from '@/Components/System/Typography'

import './ProfileTabs.style.scss'

export const ProfileTabsComponent = () => {
  const { profile } = use(ProfileContext)

  if (!profile) {
    return <></>
  }

  return (
    <ul className="profile-tabs">
      <li>
        <LinkComponent to={ROUTES.PROFILE.path.replace(':uri', profile?.uri)}>
          <TypographyComponent>Sobre</TypographyComponent>
        </LinkComponent>
      </li>

      <li>
        <LinkComponent
          to={ROUTES.PROFILE_FEED.path.replace(':uri', profile?.uri)}
        >
          <TypographyComponent>Feed</TypographyComponent>
        </LinkComponent>
      </li>

      <li>
        <LinkComponent
          to={ROUTES.PROFILE_CONNECTIONS.path.replace(':uri', profile?.uri)}
        >
          <TypographyComponent>Conexões</TypographyComponent>
        </LinkComponent>
      </li>

      <li>
        <LinkComponent
          to={ROUTES.PROFILE_GROUPS.path.replace(':uri', profile?.uri)}
        >
          <TypographyComponent>Grupos</TypographyComponent>
        </LinkComponent>
      </li>
    </ul>
  )
}
