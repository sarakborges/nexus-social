import { use, useEffect, useState } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { UserContext } from '@/Contexts/User.context'
import { FeedContext } from '@/Contexts/Feed.context'
import { SuggestionsContext } from '@/Contexts/Suggestions.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { NotificationsContext } from '@/Contexts/Notifications.context'

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
  const { activeProfile, setActiveProfile } = use(ActiveProfileContext)
  const { setFeed } = use(FeedContext)
  const { setSuggestions } = use(SuggestionsContext)
  const { setNotifications } = use(NotificationsContext)
  const [isLoading, setIsLoading] = useState(false)

  const getUser = async () => {
    setIsLoading(true)
    const userRequest = await UsersAPI.getUser()
    setIsLoading(false)

    if (!userRequest?.user?._id) {
      return
    }

    setUser(userRequest?.user)
    setFeed(userRequest?.feed)
    setSuggestions(userRequest?.suggestions)
    setNotifications(userRequest?.notifications)

    if (
      userRequest?.user?.profiles.length < 1 ||
      !userRequest?.user?.activeProfile
    ) {
      return
    }

    setActiveProfile(
      userRequest?.user?.profiles.find(
        (profileItem) => profileItem._id === userRequest?.user?.activeProfile
      )
    )
  }

  useEffect(() => {
    getUser()
  }, [user?._id, activeProfile?._id])

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
