import { use, useRef, useState } from 'react'

import { TOPBAR_MENU } from '@/Consts/Topbar.const'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'

import './TopbarMenu.style.scss'

export const TopbarMenuComponent = () => {
  const activeProfileContext = use(ActiveProfileContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  if (!activeProfileContext?.activeProfile) {
    return <></>
  }

  const { activeProfile } = activeProfileContext

  const topbarMenuDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!topbarMenuDropdownRef?.current) {
      return
    }

    setIsMenuOpen(!isMenuOpen)
    topbarMenuDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <div className="actions-dropdown-wrapper">
      <ButtonComponent
        square
        transparent
        onClick={toggleDropdown}
        active={isMenuOpen}
      >
        <ImageComponent
          src={activeProfile.picture || `/avatar-placeholder.png`}
          alt={activeProfile.name}
          rounded
          square
        />
      </ButtonComponent>

      <DropdownComponent ref={topbarMenuDropdownRef}>
        <section className="actions-menu">
          {TOPBAR_MENU.map((menuItem) => (
            <LinkComponent
              to={menuItem.to}
              key={`topbar-menu-item-${menuItem.text}`}
            >
              {menuItem.icon}
              {menuItem.text}
            </LinkComponent>
          ))}
        </section>
      </DropdownComponent>
    </div>
  )
}
