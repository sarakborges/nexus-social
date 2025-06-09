import { use, useEffect, useState } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { LoadingComponent } from '@/Components/System/Loading'

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
  const [isLoading, setIsLoading] = useState(false)

  const userId = localStorage.getItem('user-id')
    ? Number(localStorage.getItem('user-id'))
    : undefined

  if (!userId) {
    return <></>
  }

  const getUser = async () => {
    setIsLoading(true)
    const userRequest = await UsersAPI.getUser(userId)
    setIsLoading(false)

    if (!userRequest?.profiles) {
      return
    }

    setIsLoading(true)
    setUser(userRequest)
    setIsLoading(false)

    if (userRequest.profiles.length < 1 || !userRequest.activeProfile) {
      return
    }

    setActiveProfile(
      userRequest.profiles.find(
        (profileItem) => profileItem.id === userRequest.activeProfile
      )
    )
  }

  useEffect(() => {
    getUser()
  }, [user?.id])

  return (
    <main className="page-wrapper">
      <aside>
        <NavbarComponent />
      </aside>

      <aside className="page-content">
        <main>
          {!isLoading && children}

          {!!isLoading && <LoadingComponent />}
        </main>
      </aside>
    </main>
  )
}
