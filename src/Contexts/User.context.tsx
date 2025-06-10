import { createContext, useState } from 'react'

import { UserType } from '@/Types/User.type'
import { UserContextType } from '@/Types/Contexts/UserContext.type'

const UserContext = createContext<UserContextType>({} as UserContextType)

const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserType>({
    _id: '',
    email: '',
    password: ''
  })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
