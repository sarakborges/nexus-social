import { use, useState } from 'react'

import { ROUTES } from '@/Consts/Routes.const'
import {
  PROFILES_LIST_FILTER,
  PROFILES_LIST_NEW_PROFILE,
  PROFILES_LIST_TITLE,
  PROFILES_LIST_NO_PROFILE
} from '@/Consts/ProfilesList.const'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { FieldComponent } from '@/Components/System/Field'

import { ProfileListItemComponent } from '../ProfileListItem'

import './NavbarProfilesList.style.scss'

export const NavbarProfilesListComponent = () => {
  const { user } = use(UserContext)
  const { activeProfile } = use(ActiveProfileContext)

  const [profilesFilter, setProfilesFilter] = useState('')

  const changeProfileFilter = (e) => {
    setProfilesFilter(e.target.value.trim().toLocaleLowerCase())
  }

  return (
    <section className="profiles-list">
      <header>
        <TypographyComponent renderAs="h2">
          {PROFILES_LIST_TITLE}
        </TypographyComponent>

        <LinkComponent to={ROUTES.NEW_PROFILE.path} asButton>
          {PROFILES_LIST_NEW_PROFILE}
        </LinkComponent>
      </header>

      {!!user.profiles?.length ? (
        <>
          <section>
            <FieldComponent
              placeholder={PROFILES_LIST_FILTER}
              onChange={changeProfileFilter}
            />
          </section>

          <ul>
            {user.profiles
              ?.filter(
                (profileItem) =>
                  profileItem.id !== activeProfile?.id &&
                  (!profilesFilter ||
                    profileItem.name
                      .toLocaleLowerCase()
                      .includes(profilesFilter))
              )
              .map((profileItem) => (
                <ProfileListItemComponent
                  key={`user-profiles-${profileItem.id}`}
                  profile={profileItem}
                />
              ))}
          </ul>
        </>
      ) : (
        <TypographyComponent renderAs="p">
          {PROFILES_LIST_NO_PROFILE}
        </TypographyComponent>
      )}
    </section>
  )
}
