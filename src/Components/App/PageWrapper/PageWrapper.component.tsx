import { NotificationsProvider } from '@/Contexts/Notifications.context'

import { NavbarComponent } from '@/Components/App/Navbar'
import { TopbarComponent } from '@/Components/App/Topbar'

import './PageWrapper.style.scss'

type PageWrapperComponentType = {
  children: React.ReactNode
}

export const PageWrapperComponent = ({
  children
}: PageWrapperComponentType) => (
  <NotificationsProvider>
    <main className="page-wrapper">
      <aside>
        <NavbarComponent />
      </aside>

      <aside className="page-content">
        <TopbarComponent />

        <main>{children}</main>
      </aside>
    </main>
  </NotificationsProvider>
)
