import { useRef } from 'react'

import { ROUTES } from '@/Consts/Routes.const'
import { TOPBAR_LOGOUT } from '@/Consts/Topbar.const'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'

import './TopbarMenu.style.scss'

export const TopbarMenuComponent = () => {
  const topbarMenuDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!topbarMenuDropdownRef?.current) {
      return
    }

    topbarMenuDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <div className="actions-dropdown-wrapper">
      <ButtonComponent square transparent onClick={toggleDropdown}>
        <ImageComponent
          src={`https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/doomyum6816297e9e8ce.png`}
          alt="doom."
          rounded
          square
        />
      </ButtonComponent>

      <DropdownComponent ref={topbarMenuDropdownRef}>
        <LinkComponent to={ROUTES.LOGIN.path}>{TOPBAR_LOGOUT}</LinkComponent>
      </DropdownComponent>
    </div>
  )
}
