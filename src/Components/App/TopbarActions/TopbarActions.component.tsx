import { use } from 'react'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TopbarNotificationsComponent } from '@/Components/App/TopbarNotifications'
import { TopbarProfilesListComponent } from '@/Components/App/TopbarProfilesList'
import { TopbarMenuComponent } from '@/Components/App/TopbarMenu'

import './TopbarActions.style.scss'

export const TopbarActionsComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

  return (
    <section className="topbar-actions">
      <TopbarProfilesListComponent />

      {!!activeProfile?.id && <TopbarNotificationsComponent />}

      <TopbarMenuComponent />
    </section>
  )
}
