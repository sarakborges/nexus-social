import { ButtonComponent } from '@/Components/System/Button'
import { ImageComponent } from '@/Components/System/Image'

import { TopbarNotificationsComponent } from '@/Components/App/TopbarNotifications'

import './TopbarActions.style.scss'

export const TopbarActionsComponent = () => (
  <section className="topbar-actions">
    <TopbarNotificationsComponent />

    <ButtonComponent square transparent>
      <ImageComponent src="/avatar-placeholder.png" alt="User" rounded square />
    </ButtonComponent>
  </section>
)
