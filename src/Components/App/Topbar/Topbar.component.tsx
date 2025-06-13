import { UserAreaComponent } from '@/Components/App/UserArea'

import './Topbar.style.scss'

export const TopbarComponent = () => {
  return (
    <nav className="topbar">
      <div></div>
      <UserAreaComponent />
    </nav>
  )
}
