import { RouterProvider } from 'react-router'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { NotificationsProvider } from '@/Contexts/Notifications.context'
import { ActiveProfileProvider } from '@/Contexts/ActiveProfile.context'
import { UserProvider } from '@/Contexts/User.context'
import { TopbarSearchProvider } from '@/Contexts/TopbarSearch.context'
import { SuggestionsProvider } from '@/Contexts/Suggestions.context'
import { ProfileProvider } from '@/Contexts/Profile.context'
import { FeedProvider } from '@/Contexts/Feed.context'

import { ROUTER } from '@/Consts/Router.const'

import '@/Assets/main.css'

const ContextProviders = ({ children }) => {
  const providersList = [
    UserProvider,
    ActiveProfileProvider,
    FeedProvider,
    SuggestionsProvider,
    NotificationsProvider,
    TopbarSearchProvider,
    ProfileProvider
  ]

  return providersList.reduce(
    (prevProvider, CurrentProvider) => (
      <CurrentProvider>{prevProvider}</CurrentProvider>
    ),
    children
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProviders>
      <RouterProvider router={ROUTER} />
    </ContextProviders>
  </StrictMode>
)
