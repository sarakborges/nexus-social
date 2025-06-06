import { use, useEffect } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { NavbarComponent } from '@/Components/App/Navbar'

import './PageWrapper.style.scss'

type PageWrapperComponentType = {
  children: React.ReactNode
}

export const PageWrapperComponent = ({
  children
}: PageWrapperComponentType) => {
  const { user, setUser } = use(UserContext)
  const { setActiveProfile } = use(ActiveProfileContext)

  const userId = localStorage.getItem('user-id')
    ? Number(localStorage.getItem('user-id'))
    : undefined

  if (!userId) {
    return <></>
  }

  useEffect(() => {
    const getUser = async () => {
      const userRequest = await UsersAPI.getUser(userId)

      if (!userRequest?.profiles) {
        return
      }

      setUser(userRequest)

      if (userRequest.profiles.length < 1 || !userRequest.activeProfile) {
        return
      }

      setActiveProfile(
        userRequest.profiles.find(
          (profileItem) => profileItem.id === userRequest.activeProfile
        )
      )
    }

    getUser()
  }, [user?.id])

  return (
    <main className="page-wrapper">
      <aside>
        <NavbarComponent />
      </aside>

      <aside className="page-content">
        <main>{children}</main>
      </aside>
    </main>
  )
}
