import { forwardRef, useImperativeHandle, useState } from 'react'

import { DropdownComponentType } from './Dropdown.type'

import { CardComponent } from '@/Components/System/Card'

import './Dropdown.style.scss'

export const DropdownComponent = forwardRef(
  ({ children }: DropdownComponentType, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = (e) => {
      e.stopPropagation()
      setIsOpen(!isOpen)
    }

    useImperativeHandle(ref, () => ({
      toggleDropdown
    }))

    window.onclick = () => {
      setIsOpen(false)
    }

    return (
      <div
        className={['dropdown', isOpen ? 'open' : ''].filter(Boolean).join(' ')}
      >
        <CardComponent>{children}</CardComponent>
      </div>
    )
  }
)
