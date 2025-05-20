import { Fragment, use, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { TOPBAR_MENU } from '@/Consts/Topbar.const'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'

import './TopbarMenu.style.scss'

export const TopbarMenuComponent = () => {
  const navigate = useNavigate()

  const { activeProfile } = use(ActiveProfileContext)

  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const handleMenuItemClick = ({
    action,
    redirectUri
  }: {
    action: () => void
    redirectUri: string
  }) => {
    action()
    navigate(redirectUri)
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
          src={activeProfile?.picture || `/avatar-placeholder.png`}
          alt={activeProfile?.name}
          rounded
          square
        />
      </ButtonComponent>

      <DropdownComponent ref={topbarMenuDropdownRef}>
        <section className="actions-menu">
          {TOPBAR_MENU.map((menuItem) => (
            <Fragment key={`topbar-menu-item-${menuItem.text}`}>
              {!menuItem.onClick ? (
                <LinkComponent to={menuItem.to}>
                  {menuItem.icon}
                  {menuItem.text}
                </LinkComponent>
              ) : (
                <TypographyComponent
                  onClick={() =>
                    handleMenuItemClick({
                      action: menuItem.onClick,
                      redirectUri: menuItem.to
                    })
                  }
                >
                  {menuItem.icon}
                  {menuItem.text}
                </TypographyComponent>
              )}
            </Fragment>
          ))}
        </section>
      </DropdownComponent>
    </div>
  )
}
