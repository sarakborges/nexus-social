import { forwardRef, useImperativeHandle, useState } from 'react'

import { ModalComponentType } from '@/Types/Components/ModalComponent.type'

import { ButtonComponent } from '@/Components/System/Button'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'

import './Modal.style.scss'
import { FaTimes } from 'react-icons/fa'

export const ModalComponent = forwardRef(
  ({ title, children }: ModalComponentType, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleModal = (e) => {
      e.stopPropagation()
      setIsOpen(!isOpen)
    }

    useImperativeHandle(ref, () => ({
      toggleModal
    }))

    window.onclick = () => {
      setIsOpen(false)
    }

    return (
      <div
        className={['modal', isOpen ? 'open' : ''].filter(Boolean).join(' ')}
      >
        <CardComponent>
          <header>
            <TypographyComponent renderAs="h2">
              {title || ''}
            </TypographyComponent>

            <ButtonComponent onClick={toggleModal}>
              <FaTimes />
            </ButtonComponent>
          </header>

          <main>{children}</main>
        </CardComponent>
      </div>
    )
  }
)
