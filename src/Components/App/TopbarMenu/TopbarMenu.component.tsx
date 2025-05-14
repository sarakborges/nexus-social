import { use, useRef } from 'react'

import { ROUTES } from '@/Consts/Routes.const'
import { TOPBAR_LOGOUT } from '@/Consts/Topbar.const'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'

import './TopbarMenu.style.scss'

export const TopbarMenuComponent = () => {
  const activeProfileContext = use(ActiveProfileContext)

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

    topbarMenuDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <div className="actions-dropdown-wrapper">
      <ButtonComponent square transparent onClick={toggleDropdown}>
        <ImageComponent
          src={activeProfile.picture || `/avatar-placeholder.png`}
          alt={activeProfile.name}
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
