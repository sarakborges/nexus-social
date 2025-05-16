import { TopbarNotificationsComponent } from '@/Components/App/TopbarNotifications'
import { TopbarProfilesListComponent } from '@/Components/App/TopbarProfilesList'
import { TopbarMenuComponent } from '@/Components/App/TopbarMenu'

import './TopbarActions.style.scss'

export const TopbarActionsComponent = () => {
  return (
    <section className="topbar-actions">
      <TopbarProfilesListComponent />
      <TopbarNotificationsComponent />
      <TopbarMenuComponent />
    </section>
  )
}
