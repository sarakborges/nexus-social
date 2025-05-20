import { use, useEffect } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { NavbarComponent } from '@/Components/App/Navbar'
import { TopbarComponent } from '@/Components/App/Topbar'

import './PageWrapper.style.scss'

type PageWrapperComponentType = {
  children: React.ReactNode
}

export const PageWrapperComponent = ({
  children
}: PageWrapperComponentType) => {
  const { setUser } = use(UserContext)
  const { setActiveProfile } = use(ActiveProfileContext)

  const userId = localStorage.getItem('user-id')

  if (!userId) {
    return <></>
  }

  useEffect(() => {
    const getUser = async () => {
      const userRequest = await UsersAPI.getUser(userId)

      if (!userRequest) {
        return
      }

      setUser(userRequest)

      setActiveProfile(
        userRequest.profiles.find(
          (profileItem) => profileItem.id === userRequest.activeProfile
        )
      )
    }

    getUser()
  }, [])

  return (
    <main className="page-wrapper">
      <aside>
        <NavbarComponent />
      </aside>

      <aside className="page-content">
        <TopbarComponent />
        <main>{children}</main>
      </aside>
    </main>
  )
}
