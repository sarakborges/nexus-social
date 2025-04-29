import { FaBell } from 'react-icons/fa'

import { ButtonComponent } from '@/Components/System/Button'

import './TopbarNotifications.style.scss'

export const TopbarNotificationsComponent = () => (
  <ButtonComponent square transparent>
    <span className="notifications-counter">3</span>
    <FaBell />
  </ButtonComponent>
)
