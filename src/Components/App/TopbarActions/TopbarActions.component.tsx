import { use } from 'react'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TopbarNotificationsComponent } from '@/Components/App/TopbarNotifications'

import './TopbarActions.style.scss'

export const TopbarActionsComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

  return (
    <section className="topbar-actions">
      {!!activeProfile?.id && <TopbarNotificationsComponent />}
    </section>
  )
}
