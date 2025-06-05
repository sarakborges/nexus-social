import { use, useRef } from 'react'
import { FaChevronRight, FaTrash, FaUserCircle } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ROUTES } from '@/Consts/Routes.const'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'
import { DropdownComponent } from '@/Components/System/Dropdown'

import { TopbarProfilesListComponent } from '@/Components/App/TopbarProfilesList'

import './NavbarUserDropdown.style.scss'

export const NavbarUserDropdownComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

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
        <TypographyComponent renderAs="h2">
          {activeProfile?.name}
        </TypographyComponent>

        <TypographyComponent>{`@${activeProfile?.uri}`}</TypographyComponent>
      </header>

      <footer className="navbar-user-dropdown-actions">
        <LinkComponent to={ROUTES.EDIT_PROFILE.path} asButton>
          <FaPencil />
          <TypographyComponent>Editar perfil</TypographyComponent>
        </LinkComponent>

        <div className="navbar-user-dropdown-change-profile">
          <ButtonComponent onClick={toggleDropdown}>
            <section>
              <FaUserCircle />
              <TypographyComponent>Trocar de perfil</TypographyComponent>
            </section>

            <FaChevronRight />
          </ButtonComponent>

          <DropdownComponent top ref={navbarUserProfilesDropdownRef}>
            <TopbarProfilesListComponent />
          </DropdownComponent>
        </div>

        <ButtonComponent onClick={toggleDropdown} cancel>
          <FaTrash />
          <TypographyComponent>Deletar perfil</TypographyComponent>
        </ButtonComponent>
      </footer>
    </section>
  )
}
