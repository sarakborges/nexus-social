import { use } from 'react'
import { FaTrash } from 'react-icons/fa'

import * as UsersAPI from '@/Apis/Users'
import * as ProfilesAPI from '@/Apis/Profiles'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'

export const DeleteProfileComponent = ({
  profile,
  hideText
}: {
  profile: number
  hideText?: boolean
}) => {
  const { user, setUser } = use(UserContext)
  const { setActiveProfile } = use(ActiveProfileContext)

  const deleteProfile = async () => {
    const deleteProfileRequest = await ProfilesAPI.deleteProfile(profile)

    if (!deleteProfileRequest) {
      return
    }

    const deleteFromUserRequest = await UsersAPI.deleteUserProfile({
      profileId: profile,
      userId: user?.id
    })

    if (!deleteFromUserRequest) {
      return
    }

    if (user.activeProfile === profile) {
      setActiveProfile({ id: 0, name: '', uri: '', userId: 0 })
    }

    setUser({
      ...user,
      activeProfile: user.activeProfile === profile ? 0 : user.activeProfile,
      profiles: user.profiles?.filter(
        (profileItem) => profileItem.id !== profile
      )
    })
  }

  return (
    <ButtonComponent square cancel onClick={deleteProfile}>
      <FaTrash />

      {!hideText && (
        <TypographyComponent smallText>Deletar perfil</TypographyComponent>
      )}
    </ButtonComponent>
  )
}
