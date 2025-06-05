import { use } from 'react'

import { NAVBAR } from '@/Consts/Navbar.const'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'
import { TypographyComponent } from '@/Components/System/Typography'

import { NavbarUserComponent } from '@/Components/App/NavbarUser'

import './Navbar.style.scss'

export const NavbarComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

  return (
    <nav className="navbar">
      <section className="navbar-menu">
        <ImageComponent src="/logo.png" alt="Nexus" />

        <ul>
          {NAVBAR.filter(
            (navbarItem) =>
              !navbarItem.needsActiveProfile || !!activeProfile?.id
          ).map((navbarItem) => (
            <li key={navbarItem.id}>
              {!!navbarItem?.component && navbarItem?.component}

              {!!navbarItem.to && (
                <LinkComponent
                  to={navbarItem.to.replace(':id', activeProfile?.uri)}
                >
                  <>
                    {navbarItem.icon}
                    <TypographyComponent>{navbarItem.text}</TypographyComponent>
                  </>
                </LinkComponent>
              )}
            </li>
          ))}
        </ul>
      </section>

      <NavbarUserComponent />
    </nav>
  )
}
