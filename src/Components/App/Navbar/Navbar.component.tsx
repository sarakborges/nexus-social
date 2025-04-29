import { NAVBAR } from '@/Consts/Navbar.const'

import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'

import './Navbar.style.scss'

export const NavbarComponent = () => (
  <nav className="navbar">
    <ImageComponent src="/logo.png" alt="Nexus" />

    <ul>
      {NAVBAR.map((navbarItem) => (
        <li key={navbarItem.id}>
          <LinkComponent to={navbarItem.to}>
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
