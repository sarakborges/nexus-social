import { use } from 'react'
import { useNavigate } from 'react-router'
import { BiSolidDoorOpen } from 'react-icons/bi'

import { getTexts } from '@/Texts'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ROUTES } from '@/Consts/Routes.const'

import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'

export const DoLogoutComponent = () => {
  const navigate = useNavigate()

  const { setUser } = use(UserContext)
  const { setActiveProfile } = use(ActiveProfileContext)

  const doLogout = async () => {
    setUser({
      email: '',
      password: '',
      _id: ''
    })

    setActiveProfile({
      _id: '',
      name: '',
      uri: '',
      userId: ''
    })

    localStorage.removeItem('nexus-token')

    navigate(ROUTES.LOGIN.path)
  }

  return (
    <ButtonComponent onClick={doLogout}>
      <BiSolidDoorOpen />

      <TypographyComponent smallText>
        {getTexts('DO_LOGOUT')}
      </TypographyComponent>
    </ButtonComponent>
  )
}
