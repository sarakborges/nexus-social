import { ROUTES } from '@/Consts/Routes.const'

import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from '@/Types/Group.type'

import { ImageComponent } from '@/Components/System/Image'
import { LinkComponent } from '@/Components/System/Link'
import { TypographyComponent } from '@/Components/System/Typography'

import './TopbarSearchResultItem.style.scss'

export const TopbarSearchResultItemComponent = ({
  resultItem,
  type
}: {
  resultItem: ProfileType | GroupType
  type: 'profile' | 'group'
}) => {
  const { name, uri, picture } = resultItem

  let linkUri

  if (type === 'group') {
    linkUri = ROUTES.GROUP.path
  }

  if (type === 'profile') {
    linkUri = ROUTES.PROFILE.path
  }

  linkUri = linkUri.replace(':id', uri)

  return (
    <li className="topbar-search-result-item">
      <LinkComponent to={linkUri}>
        <ImageComponent
          src={picture || `/avatar-placeholder.png`}
          alt={name}
          rounded
          square
        />

        <TypographyComponent renderAs="span">{name}</TypographyComponent>
      </LinkComponent>
    </li>
  )
}
