import { ReactNode } from 'react'
import './Card.style.scss'

export const CardComponent = ({
  className,
  children
}: {
  className?: string
  children: ReactNode
}) => (
  <div className={['card', className].filter(Boolean).join(' ')}>
    {children}
  </div>
)
