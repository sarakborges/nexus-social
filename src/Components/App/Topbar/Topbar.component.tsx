import { NotificationsComponent } from '@/Components/App/Notifications'
import { UserAreaComponent } from '@/Components/App/UserArea'

import './Topbar.style.scss'

export const TopbarComponent = () => {
  return (
    <nav className="topbar">
      <div></div>

      <section className="topbar-user-actions">
        <NotificationsComponent />
        <UserAreaComponent />
      </section>
    </nav>
  )
}
