import { createContext, useState } from 'react'

import { ProfileType } from '@/Types/Profile.type'
import { ActiveProfileContextType } from '@/Types/Contexts/ActiveProfileContext.type'

const INITIAL_PROFILE: ProfileType = {
  id: '3',
  name: 'ibuki.',
  uri: 'shadow-sneak',
  picture: `https://image.yoble.us/avatar/shadow-sneak682365c473ebf.png`
}

const ActiveProfileContext = createContext<ActiveProfileContextType | null>(
  null
)

const ActiveProfileProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] =
    useState<ProfileType>(INITIAL_PROFILE)

  return (
    <ActiveProfileContext.Provider value={{ activeProfile, setActiveProfile }}>
      {children}
    </ActiveProfileContext.Provider>
  )
}

export { ActiveProfileProvider, ActiveProfileContext }
