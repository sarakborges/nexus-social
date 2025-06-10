import { use, useRef } from 'react'
import { FaChevronRight, FaUserCircle, FaUserPlus } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { UserContext } from '@/Contexts/User.context'

import { ROUTES } from '@/Consts/Routes.const'
import { PROFILES_LIST_NEW_PROFILE } from '@/Consts/ProfilesList.const'
import {
  NAVBAR_USER_CREATE_PROFILE_TO_START,
  NAVBAR_USER_EDIT_PROFILE,
  NAVBAR_USER_SELECT_PROFILE,
  NAVBAR_USER_SELECT_PROFILE_TO_START,
  NAVBAR_USER_WELCOME
} from '@/Consts/Navbar.const'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'
import { DropdownComponent } from '@/Components/System/Dropdown'

import { DeleteProfileComponent } from '@/Components/Actions/DeleteProfile'

import { NavbarProfilesListComponent } from '@/Components/App/NavbarProfilesList'
import { DoLogoutComponent } from '@/Components/Actions/DoLogout'

import './NavbarUserDropdown.style.scss'

export const NavbarUserDropdownComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)
  const { user } = use(UserContext)

  const navbarUserProfilesDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!navbarUserProfilesDropdownRef?.current) {
      return
    }

    navbarUserProfilesDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <section className="navbar-user-dropdown">
      <section className="navbar-user-dropdown-picture">
        <ImageComponent
          src={activeProfile?.picture || `/avatar-placeholder.png`}
          alt={activeProfile?.name}
          rounded
          square
        />
      </section>

      <header className="navbar-user-dropdown-name">
        {!!activeProfile?._id && (
          <>
            <TypographyComponent renderAs="h2">
              {activeProfile?.name}
            </TypographyComponent>

            <TypographyComponent renderAs="p">{`@${activeProfile?.uri}`}</TypographyComponent>

            {!!activeProfile?.bio && (
              <article>
                <TypographyComponent smallText renderAs="p">
                  {activeProfile?.bio}
                </TypographyComponent>
              </article>
            )}
          </>
        )}

        {!!user?.profiles?.length && !activeProfile?._id && (
          <>
            <TypographyComponent renderAs="h2">
              {NAVBAR_USER_WELCOME}
            </TypographyComponent>

            <TypographyComponent smallText renderAs="p">
              {NAVBAR_USER_SELECT_PROFILE_TO_START}
            </TypographyComponent>
          </>
        )}

        {!user?.profiles?.length && (
          <>
            <TypographyComponent renderAs="h2">
              {NAVBAR_USER_WELCOME}
            </TypographyComponent>

            <TypographyComponent smallText renderAs="p">
              {NAVBAR_USER_CREATE_PROFILE_TO_START}
            </TypographyComponent>
          </>
        )}
      </header>

      <footer className="navbar-user-dropdown-actions">
        {!!activeProfile?._id && (
          <LinkComponent to={ROUTES.EDIT_PROFILE.path} asButton>
            <FaPencil />
            <TypographyComponent smallText>
              {NAVBAR_USER_EDIT_PROFILE}
            </TypographyComponent>
          </LinkComponent>
        )}

        <LinkComponent to={ROUTES.NEW_PROFILE.path} asButton>
          <FaUserPlus />

          <TypographyComponent smallText>
            {PROFILES_LIST_NEW_PROFILE}
          </TypographyComponent>
        </LinkComponent>

        {!!user?.profiles?.length &&
          (!activeProfile?._id || user?.profiles?.length > 1) && (
            <div className="navbar-user-dropdown-change-profile">
              <ButtonComponent onClick={toggleDropdown}>
                <section>
                  <FaUserCircle />
                  <TypographyComponent smallText>
                    {NAVBAR_USER_SELECT_PROFILE}
                  </TypographyComponent>
                </section>

                <FaChevronRight />
              </ButtonComponent>

              <DropdownComponent top ref={navbarUserProfilesDropdownRef}>
                <NavbarProfilesListComponent />
              </DropdownComponent>
            </div>
          )}

        {!!activeProfile?._id && (
          <DeleteProfileComponent profile={activeProfile?._id} />
        )}

        <DoLogoutComponent />
      </footer>
    </section>
  )
}
