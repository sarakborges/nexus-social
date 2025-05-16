import { createContext, useState } from 'react'

import { UserType } from '@/Types/User.type'
import { UserContextType } from '@/Types/Contexts/UserContext.type'

const INITIAL_USER: UserType = {
  id: '1',
  profiles: [
    {
      id: '1',
      name: 'hope.',
      uri: 'hopyumm',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/first-blood67e450dcccc7c.png`
    },

    {
      id: '2',
      name: 'doom.',
      uri: 'doomyumm',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/doomyum6816297e9e8ce.png`
    },

    {
      id: '3',
      name: 'ibuki.',
      uri: 'shadow-sneak',
      picture: `https://image.yoble.us/avatar/shadow-sneak682365c473ebf.png`
    },

    {
      id: '4',
      name: 'barbatos.',
      uri: 'il-vento-dubriaco',
      picture: `https://image.yoble.us/avatar/il-vento-dubriaco6823c2196347d.png`
    }
  ]
}

const UserContext = createContext<UserContextType | null>(null)

const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserType>(INITIAL_USER)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
