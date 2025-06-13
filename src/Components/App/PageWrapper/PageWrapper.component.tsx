import { use, useEffect, useState } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { LoadingComponent } from '@/Components/System/Loading'

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
  const [isLoading, setIsLoading] = useState(false)

  const userId = localStorage.getItem('user-id')
    ? localStorage.getItem('user-id')
    : undefined

  const getUser = async () => {
    if (!userId || user?._id === userId) {
      return
    }

    setIsLoading(true)
    const userRequest = await UsersAPI.getUser(userId)
    setIsLoading(false)

    setUser(userRequest)

    if (userRequest.profiles.length < 1 || !userRequest.activeProfile) {
      return
    }

    setActiveProfile(
      userRequest.profiles.find(
        (profileItem) => profileItem._id === userRequest.activeProfile
      )
    )
  }

  useEffect(() => {
    getUser()
  }, [user?._id])

  return (
    <main className="page-wrapper">
      {!isLoading && (
        <>
          <NavbarComponent />

          <main className="page-content">
            <TopbarComponent />
            {children}
          </main>
        </>
      )}

      {!!isLoading && (
        <div className="loader-wrapper">
          <LoadingComponent />
        </div>
      )}
    </main>
  )
}
