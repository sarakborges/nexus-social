import { TopbarNotificationsComponent } from '@/Components/App/TopbarNotifications'
import { TopbarMenuComponent } from '@/Components/App/TopbarMenu'

import './TopbarActions.style.scss'

export const TopbarActionsComponent = () => {
  return (
    <section className="topbar-actions">
      <TopbarNotificationsComponent />
      <TopbarMenuComponent />
    </section>
  )
}
