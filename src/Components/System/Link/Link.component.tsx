import { NavLink, NavLinkProps } from 'react-router'

import './Link.style.scss'

export const LinkComponent = ({
  asButton,
  ...rest
}: { asButton?: boolean } & NavLinkProps) => (
  <NavLink
    className={['link', asButton ? 'link-button' : '']
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    {rest.children}
  </NavLink>
)
