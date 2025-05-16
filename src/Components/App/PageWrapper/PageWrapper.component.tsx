import { NotificationsProvider } from '@/Contexts/Notifications.context'
import { ActiveProfileProvider } from '@/Contexts/ActiveProfile.context'
import { UserProvider } from '@/Contexts/User.context'

import { NavbarComponent } from '@/Components/App/Navbar'
import { TopbarComponent } from '@/Components/App/Topbar'

import './PageWrapper.style.scss'

type PageWrapperComponentType = {
  children: React.ReactNode
}

const PageProviders = ({ children }) => {
  const providersList = [
    UserProvider,
    ActiveProfileProvider,
    NotificationsProvider
  ]

  return providersList.reduce(
    (prevProvider, CurrentProvider) => (
      <CurrentProvider>{prevProvider}</CurrentProvider>
    ),
    children
  )
}

export const PageWrapperComponent = ({
  children
}: PageWrapperComponentType) => (
  <PageProviders>
    <main className="page-wrapper">
      <aside>
        <NavbarComponent />
      </aside>

      <aside className="page-content">
        <TopbarComponent />

        <main>{children}</main>
      </aside>
    </main>
  </PageProviders>
)
