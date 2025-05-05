import { useRef } from 'react'

import { ROUTES } from '@/Consts/Routes.const'
import { TOPBAR_LOGOUT } from '@/Consts/Topbar.const'

import { DropdownComponent } from '@/Components/System/Dropdown'
import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'

import { TopbarNotificationsComponent } from '@/Components/App/TopbarNotifications'

import './TopbarActions.style.scss'

export const TopbarActionsComponent = () => {
  const dropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!dropdownRef?.current) {
      return
    }

    dropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <section className="topbar-actions">
      <TopbarNotificationsComponent />

      <div className="actions-dropdown-wrapper">
        <ButtonComponent square transparent onClick={toggleDropdown}>
          <ImageComponent
            src="/avatar-placeholder.png"
            alt="User"
            rounded
            square
          />
        </ButtonComponent>

        <DropdownComponent ref={dropdownRef}>
          <LinkComponent to={ROUTES.LOGIN.path}>{TOPBAR_LOGOUT}</LinkComponent>
        </DropdownComponent>
      </div>
    </section>
  )
}
