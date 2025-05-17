import { ButtonComponentType } from '@/Types/Components/ButtonComponent.type'

import './Button.style.scss'

export const ButtonComponent = ({
  primary,
  cancel,
  transparent,
  active,
  square,
  children,
  ...rest
}: ButtonComponentType) => {
  const classList = [
    'button',
    primary || (!transparent && !cancel) ? 'primary' : '',
    transparent && !primary ? 'transparent' : '',
    cancel && !primary ? 'cancel' : '',
    active ? 'active' : active,
    square ? 'square' : square
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classList} {...rest}>
      {children}
    </button>
  )
}
