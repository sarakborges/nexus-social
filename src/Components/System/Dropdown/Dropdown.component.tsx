import { useState } from 'react'

import { DropdownComponentType } from './Dropdown.type'

import { CardComponent } from '@/Components/System/Card'
import { ButtonComponent } from '@/Components/System/Button'

import './Dropdown.style.scss'

export const DropdownComponent = ({
  dropdownTrigger,
  children
}: DropdownComponentType) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  window.onclick = () => {
    setIsOpen(false)
  }

  return (
    <div className="dropdown-wrapper">
      <ButtonComponent square transparent onClick={toggleDropdown}>
        {dropdownTrigger}
      </ButtonComponent>

      <div
        className={['dropdown', isOpen ? 'open' : '']
          .filter((classItem) => !!classItem)
          .join(' ')}
      >
        <CardComponent>{children}</CardComponent>
      </div>
    </div>
  )
}
