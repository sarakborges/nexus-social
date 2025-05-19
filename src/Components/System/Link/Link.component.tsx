import { NavLink, NavLinkProps } from 'react-router'

import './Link.style.scss'

export const LinkComponent = ({
  square,
  asButton,
  ...rest
}: { asButton?: boolean; square?: boolean } & NavLinkProps) => (
  <NavLink
    className={['link', asButton ? 'link-button' : '', square ? 'square' : '']
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {rest.children}
  </NavLink>
)
