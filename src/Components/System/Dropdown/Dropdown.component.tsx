import { forwardRef, useImperativeHandle, useState } from 'react'

import { DropdownComponentType } from '@/Types/Components/DropdownComponent.type'

import { CardComponent } from '@/Components/System/Card'

import './Dropdown.style.scss'

export const DropdownComponent = forwardRef(
  ({ children, left, top }: DropdownComponentType, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }

    const openDropdown = () => {
      setIsOpen(true)
    }

    const closeDropdown = () => {
      setIsOpen(false)
    }

    useImperativeHandle(ref, () => ({
      toggleDropdown,
      openDropdown,
      closeDropdown
    }))

    return (
      <div
        className={[
          'dropdown',
          isOpen ? 'open' : '',
          left ? 'left' : '',
          top ? 'top' : ''
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <CardComponent>{children}</CardComponent>
      </div>
    )
  }
)
