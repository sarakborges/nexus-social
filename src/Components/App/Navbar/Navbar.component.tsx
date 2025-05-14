import { use } from 'react'

import { NAVBAR } from '@/Consts/Navbar.const'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'

import './Navbar.style.scss'

export const NavbarComponent = () => {
  const activeProfileContext = use(ActiveProfileContext)

  if (!activeProfileContext?.activeProfile) {
    return <></>
  }

  const { activeProfile } = activeProfileContext

  return (
    <nav className="navbar">
      <ImageComponent src="/logo.png" alt="Nexus" />

      <ul>
        {NAVBAR.map((navbarItem) => (
          <li key={navbarItem.id}>
            <LinkComponent to={navbarItem.to.replace(':id', activeProfile.uri)}>
              <>
                {navbarItem.icon}
                <span>{navbarItem.text}</span>
              </>
            </LinkComponent>
          </li>
        ))}
      </ul>
    </nav>
  )
}
