import { use } from 'react'
import { useNavigate } from 'react-router'
import { BiSolidDoorOpen } from 'react-icons/bi'

import { ROUTES } from '@/Consts/Routes.const'
import { NAVBAR_USER_LOGOUT } from '@/Consts/Navbar.const'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

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
    localStorage.removeItem('user-id')

    navigate(ROUTES.LOGIN.path)
  }

  return (
    <ButtonComponent onClick={doLogout}>
      <BiSolidDoorOpen />

      <TypographyComponent smallText>{NAVBAR_USER_LOGOUT}</TypographyComponent>
    </ButtonComponent>
  )
}
