import { createContext, useState } from 'react'

import { ProfileType } from '@/Types/Profile.type'
import { ProfileContextType } from '@/Types/Contexts/ProfileContext.type'

const ProfileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
)

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState<ProfileType>({
    _id: '',
    userId: '',
    name: '',
    uri: ''
  })

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ProfileProvider, ProfileContext }
