import { createContext, useState } from 'react'

import { FeedType } from '@/Types/Feed.type'
import { FeedContextType } from '@/Types/Contexts/FeedContext.type'

const INITIAL_FEED: FeedType[] = [
  {
    id: '1',
    content: `gays`,
    date: new Date('2025-05-01 07:15:00'),
    profile: {
      id: '1',
      name: 'doom.',
      uri: 'doomyumm',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/doomyum6816297e9e8ce.png`
    }
  },

  {
    id: '2',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/upload/950385/hoshimi-miyabi68196a8d86357.png`,
    date: new Date('2025-05-01 07:15:00'),
    profile: {
      id: '1',
      name: 'doom.',
      uri: 'doomyumm',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/doomyum6816297e9e8ce.png`
    }
  },

  {
    id: '3',
    content: 'veyr',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/upload/950385/hoshimi-miyabi68196a8d86357.png`,
    date: new Date('2025-05-01 07:15:00'),
    profile: {
      id: '1',
      name: 'doom.',
      uri: 'doomyumm',
      picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/doomyum6816297e9e8ce.png`
    }
  }
]

const FeedContext = createContext<FeedContextType | null>(null)

const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState<FeedType[]>(INITIAL_FEED)

  return (
    <FeedContext.Provider value={{ feed, setFeed }}>
      {children}
    </FeedContext.Provider>
  )
}

export { FeedProvider, FeedContext }
