import { use, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

import * as ProfilesAPI from '@/Apis/Profiles'

import { NAVBAR_USER_DELETE_PROFILE } from '@/Consts/Navbar.const'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'
import { LoadingComponent } from '@/Components/System/Loading'

export const DeleteProfileComponent = ({
  profile,
  hideText
}: {
  profile: string
  hideText?: boolean
}) => {
  const { user, setUser } = use(UserContext)
  const { setActiveProfile } = use(ActiveProfileContext)
  const [isLoading, setIsLoading] = useState(false)

  const deleteProfile = async () => {
    setIsLoading(true)
    const deleteProfileRequest = await ProfilesAPI.deleteProfile(profile)
    setIsLoading(false)

    if (!deleteProfileRequest) {
      return
    }

    if (user.activeProfile === profile) {
      setActiveProfile({ _id: '', name: '', uri: '', userId: '' })
    }

    setUser({
      ...user,
      activeProfile: user.activeProfile === profile ? '' : user.activeProfile,
      profiles: user.profiles?.filter(
        (profileItem) => profileItem._id !== profile
      )
    })
  }

  return (
    <ButtonComponent
      square={hideText}
      cancel
      onClick={deleteProfile}
      disabled={isLoading}
    >
      {!!isLoading && <LoadingComponent />}

      {!isLoading && (
        <>
          <FaTrash />

          {!hideText && (
            <TypographyComponent smallText>
              {NAVBAR_USER_DELETE_PROFILE}
            </TypographyComponent>
          )}
        </>
      )}
    </ButtonComponent>
  )
}
