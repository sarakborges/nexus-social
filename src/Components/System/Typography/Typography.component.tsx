import { ReactNode } from 'react'

import './Typography.style.scss'

export const TypographyComponent = ({
  renderAs,
  smallText,
  children
}: {
  renderAs?: 'p' | 'span' | 'h1' | 'h2' | 'h3'
  smallText?: boolean
  children: ReactNode
}) => {
  const className = ['typography', smallText ? 'small' : '']
    .filter(Boolean)
    .join(' ')

  const components = {
    p: <p className={className}>{children}</p>,
    span: <span className={className}>{children}</span>,
    h1: <h1 className={className}>{children}</h1>,
    h2: <h2 className={className}>{children}</h2>,
    h3: <h3 className={className}>{children}</h3>
  }

  return components[renderAs || 'p']
}
