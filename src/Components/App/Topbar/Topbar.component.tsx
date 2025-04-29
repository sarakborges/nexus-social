import { TopbarSearchComponent } from '@/Components/App/TopbarSearch'
import { TopbarActionsComponent } from '@/Components/App/TopbarActions'

import './Topbar.style.scss'

export const TopbarComponent = () => (
  <section className="topbar">
    <TopbarSearchComponent />
    <TopbarActionsComponent />
  </section>
)
