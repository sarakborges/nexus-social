import { ReactNode } from 'react'

import './Typography.style.scss'

export const TypographyComponent = ({
  renderAs,
  smallText,
  onClick,
  children
}: {
  renderAs?: 'p' | 'span' | 'h1' | 'h2' | 'h3'
  smallText?: boolean
  onClick?: () => void
  children: ReactNode
}) => {
  const className = ['typography', smallText ? 'small' : '']
    .filter(Boolean)
    .join(' ')

  const props = {
    className,
    onClick
  }

  const components = {
    p: <p {...props}>{children}</p>,
    span: <span {...props}>{children}</span>,
    h1: <h1 {...props}>{children}</h1>,
    h2: <h2 {...props}>{children}</h2>,
    h3: <h3 {...props}>{children}</h3>
  }

  return components[renderAs || 'span']
}
