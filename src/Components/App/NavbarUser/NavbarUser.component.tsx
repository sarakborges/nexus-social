import { use, useRef } from 'react'
import { FaCog } from 'react-icons/fa'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ROUTES } from '@/Consts/Routes.const'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'
import { DropdownComponent } from '@/Components/System/Dropdown'
import { CardComponent } from '@/Components/System/Card'

import { NavbarUserDropdownComponent } from '@/Components/App/NavbarUserDropdown'

import './NavbarUser.style.scss'

export const NavbarUserComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

  const navbarUserDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!navbarUserDropdownRef?.current) {
      return
    }

    navbarUserDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <section className="navbar-user">
      <CardComponent>
        <ButtonComponent onClick={toggleDropdown} transparent>
          <ImageComponent
            src={activeProfile?.picture || `/avatar-placeholder.png`}
            alt={activeProfile?.name}
            rounded
            square
          />

          <section>
            {!!activeProfile?._id && (
              <>
                <TypographyComponent renderAs="p">
                  {activeProfile?.name}
                </TypographyComponent>

                <TypographyComponent smallText renderAs="p">
                  {`@${activeProfile?.uri}`}
                </TypographyComponent>
              </>
            )}

            {!activeProfile?._id && (
              <>
                <TypographyComponent renderAs="p">
                  Bem vindo!
                </TypographyComponent>

                <TypographyComponent smallText renderAs="p">
                  Selecione um perfil aqui.
                </TypographyComponent>
              </>
            )}
          </section>
        </ButtonComponent>

        <LinkComponent to={ROUTES.HOME.path} asButton>
          <FaCog />
        </LinkComponent>

        <DropdownComponent left ref={navbarUserDropdownRef}>
          <NavbarUserDropdownComponent closeParentDropdown={toggleDropdown} />
        </DropdownComponent>
      </CardComponent>
    </section>
  )
}
