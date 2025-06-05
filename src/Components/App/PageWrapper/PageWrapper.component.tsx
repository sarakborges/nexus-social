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

      const profilesRequest = await UsersAPI.getProfilesFromUser(userId)

      if (!profilesRequest) {
        return
      }

      setUser({ ...userRequest, profiles: profilesRequest })

      if (profilesRequest.length < 1 || !userRequest.activeProfile) {
        return
      }

      setActiveProfile(
        profilesRequest.find(
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
