import { FaTrash } from 'react-icons/fa'

import {
  PROFILES_LIST_ACTIVATE_PROFILE,
  PROFILES_LIST_ACTIVE_PROFILE,
  PROFILES_LIST_UNSEEN_NOTIFICATIONS
} from '@/Consts/ProfilesList.const'

import { ProfileType } from '@/Types/Profile.type'

import { ImageComponent } from '@/Components/System/Image'
import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'

import './ProfileListItem.style.scss'

export const ProfileListItemComponent = ({
  profile,
  noActions
}: {
  profile: ProfileType
  noActions?: boolean
}) => {
  return (
    <li className="profile-item">
      <ImageComponent
        src={profile.picture || `/avatar-placeholder.png`}
        alt={profile.name}
        rounded
        square
      />

      <section className="profiles-list-name">
        <TypographyComponent>{profile.name}</TypographyComponent>

        {noActions && (
          <TypographyComponent smallText>
            {PROFILES_LIST_ACTIVE_PROFILE}
          </TypographyComponent>
        )}

        {!noActions && (
          <TypographyComponent smallText>
            {PROFILES_LIST_UNSEEN_NOTIFICATIONS.replace(':count', '7')}
          </TypographyComponent>
        )}
      </section>

      <section className="profiles-list-actions">
        {!noActions && (
          <ButtonComponent>{PROFILES_LIST_ACTIVATE_PROFILE}</ButtonComponent>
        )}

        <ButtonComponent square cancel>
          <FaTrash />
        </ButtonComponent>
      </section>
    </li>
  )
}
