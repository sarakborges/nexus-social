import { use, useRef, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

import { ROUTES } from '@/Consts/Routes.const'
import {
  PROFILES_LIST_FILTER,
  PROFILES_LIST_NEW_PROFILE,
  PROFILES_LIST_TITLE
} from '@/Consts/ProfilesList.const'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'

import { ProfileListItemComponent } from '../ProfileListItem'

import './TopbarProfilesList.style.scss'
import { FieldComponent } from '@/Components/System/Field'

export const TopbarProfilesListComponent = () => {
  const userContext = use(UserContext)
  const activeProfileContext = use(ActiveProfileContext)
  const [isProfilesListOpen, setIsProfilesListOpen] = useState(false)

  if (!activeProfileContext?.activeProfile) {
    return <></>
  }

  const { activeProfile } = activeProfileContext

  if (!userContext?.user) {
    return <></>
  }

  const { user } = userContext

  const [profilesFilter, setProfilesFilter] = useState('')

  const topbarProfilesListDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!topbarProfilesListDropdownRef?.current) {
      return
    }

    setIsProfilesListOpen(!isProfilesListOpen)
    topbarProfilesListDropdownRef?.current?.toggleDropdown(e)
  }

  const changeProfileFilter = (e) => {
    setProfilesFilter(e.target.value.trim().toLocaleLowerCase())
  }

  return (
    <div className="actions-dropdown-wrapper">
      <ButtonComponent
        square
        transparent
        onClick={toggleDropdown}
        active={isProfilesListOpen}
      >
        <FaUserCircle />
      </ButtonComponent>

      <DropdownComponent ref={topbarProfilesListDropdownRef}>
        <section className="profiles-list">
          <header>
            <TypographyComponent renderAs="h2">
              {PROFILES_LIST_TITLE.replace(
                ':count',
                String(user.profiles?.length)
              )}
            </TypographyComponent>

            <LinkComponent to={ROUTES.HOME.path} asButton>
              {PROFILES_LIST_NEW_PROFILE}
            </LinkComponent>
          </header>

          <section>
            <FieldComponent
              placeholder={PROFILES_LIST_FILTER}
              onChange={changeProfileFilter}
            />
          </section>

          <ul>
            <ProfileListItemComponent profile={activeProfile} noActions />

            {user.profiles
              ?.filter(
                (profileItem) =>
                  profileItem.id !== activeProfile.id &&
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
        </section>
      </DropdownComponent>
    </div>
  )
}
