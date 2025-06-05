import { use } from 'react'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'

import * as UsersAPI from '@/Apis/Users'
import * as ProfilesAPI from '@/Apis/Profiles'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ROUTES } from '@/Consts/Routes.const'
import {
  PROFILES_LIST_ACTIVATE_PROFILE,
  PROFILES_LIST_ACTIVE_PROFILE,
  PROFILES_LIST_UNSEEN_NOTIFICATIONS
} from '@/Consts/ProfilesList.const'

import { ProfileType } from '@/Types/Profile.type'

import { ImageComponent } from '@/Components/System/Image'
import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'

import './ProfileListItem.style.scss'

export const ProfileListItemComponent = ({
  profile,
  isActiveProfile
}: {
  profile: ProfileType
  isActiveProfile?: boolean
}) => {
  const { user, setUser } = use(UserContext)
  const { setActiveProfile } = use(ActiveProfileContext)

  const { id, name, picture } = profile

  const changeActiveProfile = async (profileId: number) => {
    const updateRequest = await UsersAPI.updateActiveProfile({
      profileId,
      userId: user?.id
    })

    if (!updateRequest) {
      return
    }

    setActiveProfile(
      user.profiles?.find((profileItem) => profileItem.id === profileId)!
    )
  }

  const deleteProfile = async (profileId: number) => {
    const deleteProfileRequest = await ProfilesAPI.deleteProfile(profileId)

    if (!deleteProfileRequest) {
      return
    }

    const deleteFromUserRequest = await UsersAPI.deleteUserProfile({
      profileId,
      userId: user?.id
    })

    if (!deleteFromUserRequest) {
      return
    }

    if (user.activeProfile === profileId) {
      setActiveProfile({ id: 0, name: '', uri: '', userId: 0 })
    }

    setUser({
      ...user,
      activeProfile: user.activeProfile === profileId ? 0 : user.activeProfile,
      profiles: user.profiles?.filter(
        (profileItem) => profileItem.id !== profileId
      )
    })
  }

  return (
    <li className="profile-item">
      <ImageComponent
        src={picture || `/avatar-placeholder.png`}
        alt={name}
        rounded
        square
      />

      <section className="profiles-list-name">
        <TypographyComponent>{name}</TypographyComponent>

        {isActiveProfile && (
          <TypographyComponent smallText>
            {PROFILES_LIST_ACTIVE_PROFILE}
          </TypographyComponent>
        )}

        {!isActiveProfile && (
          <TypographyComponent smallText>
            {PROFILES_LIST_UNSEEN_NOTIFICATIONS.replace(':count', '0')}
          </TypographyComponent>
        )}
      </section>

      <section className="profiles-list-actions">
        {!isActiveProfile && (
          <ButtonComponent onClick={() => changeActiveProfile(id)}>
            {PROFILES_LIST_ACTIVATE_PROFILE}
          </ButtonComponent>
        )}

        {isActiveProfile && (
          <LinkComponent to={ROUTES.PROFILE.path} asButton square>
            <FaPencil />
          </LinkComponent>
        )}

        <ButtonComponent square cancel onClick={() => deleteProfile(id)}>
          <FaTrash />
        </ButtonComponent>
      </section>
    </li>
  )
}
