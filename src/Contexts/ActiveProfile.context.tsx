import { createContext, useState } from 'react'

import { ProfileType } from '@/Types/Profile.type'
import { ActiveProfileContextType } from '@/Types/Contexts/ActiveProfileContext.type'

const ActiveProfileContext = createContext<ActiveProfileContextType>(
  {} as ActiveProfileContextType
)

const ActiveProfileProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState<ProfileType>({
    _id: '',
    userId: '',
    name: '',
    uri: ''
  })

  return (
    <ActiveProfileContext.Provider value={{ activeProfile, setActiveProfile }}>
      {children}
    </ActiveProfileContext.Provider>
  )
}

export { ActiveProfileProvider, ActiveProfileContext }
