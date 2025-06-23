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

  const getUser = async () => {
    setIsLoading(true)
    const userRequest = await UsersAPI.getUser()
    setIsLoading(false)

    if (!userRequest) {
      return
    }

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

          <div className="page-content-wrapper">
            <TopbarComponent />
            <main className="page-content">{children}</main>
          </div>
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
