import { ROUTES } from '@/Consts/Routes.const'

import { DropdownComponent } from '@/Components/System/Dropdown/Dropdown.component'
import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'

import { TopbarNotificationsComponent } from '@/Components/App/TopbarNotifications'

import './TopbarActions.style.scss'

export const TopbarActionsComponent = () => (
  <section className="topbar-actions">
    <TopbarNotificationsComponent />

    <DropdownComponent
      dropdownTrigger={
        <ImageComponent
          src="/avatar-placeholder.png"
          alt="User"
          rounded
          square
        />
      }
    >
      <LinkComponent to={ROUTES.LOGIN.path}>Logout</LinkComponent>
    </DropdownComponent>
  </section>
)
