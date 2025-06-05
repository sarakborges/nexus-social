import { use, useRef } from 'react'
import { FaChevronRight, FaUserCircle, FaUserPlus } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { UserContext } from '@/Contexts/User.context'

import { ROUTES } from '@/Consts/Routes.const'
import { PROFILES_LIST_NEW_PROFILE } from '@/Consts/ProfilesList.const'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'
import { DropdownComponent } from '@/Components/System/Dropdown'

import { DeleteProfileComponent } from '@/Components/Actions/DeleteProfile'

import { TopbarProfilesListComponent } from '@/Components/App/TopbarProfilesList'

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
        {!!activeProfile?.id && (
          <>
            <TypographyComponent renderAs="h2">
              {activeProfile?.name}
            </TypographyComponent>

            <TypographyComponent renderAs="p">{`@${activeProfile?.uri}`}</TypographyComponent>
          </>
        )}

        {!!user?.profiles?.length && !activeProfile?.id && (
          <>
            <TypographyComponent renderAs="h2">
              Bem vindo ao Nexus!
            </TypographyComponent>

            <TypographyComponent smallText renderAs="p">
              Selecione um perfil para começar a interagir!
            </TypographyComponent>
          </>
        )}

        {!user?.profiles?.length && (
          <>
            <TypographyComponent renderAs="h2">
              Bem vindo ao Nexus!
            </TypographyComponent>

            <TypographyComponent smallText renderAs="p">
              Crie um perfil para começar a interagir!
            </TypographyComponent>
          </>
        )}
      </header>

      <footer className="navbar-user-dropdown-actions">
        {!!activeProfile?.id && (
          <LinkComponent to={ROUTES.EDIT_PROFILE.path} asButton>
            <FaPencil />
            <TypographyComponent smallText>Editar perfil</TypographyComponent>
          </LinkComponent>
        )}

        <div className="navbar-user-dropdown-change-profile">
          <ButtonComponent onClick={toggleDropdown}>
            <section>
              <FaUserCircle />
              <TypographyComponent smallText>
                {!!activeProfile?.id ? `Trocar de perfil` : `Selecionar perfil`}
              </TypographyComponent>
            </section>

            <FaChevronRight />
          </ButtonComponent>

          <DropdownComponent top ref={navbarUserProfilesDropdownRef}>
            <TopbarProfilesListComponent />
          </DropdownComponent>

          {!user?.profiles?.length && (
            <LinkComponent to={ROUTES.NEW_PROFILE.path} asButton>
              <FaUserPlus />

              <TypographyComponent smallText>
                {PROFILES_LIST_NEW_PROFILE}
              </TypographyComponent>
            </LinkComponent>
          )}
        </div>

        {!!activeProfile?.id && (
          <DeleteProfileComponent profile={activeProfile?.id} />
        )}
      </footer>
    </section>
  )
}
