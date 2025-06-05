import { createContext, useState } from 'react'

import { FeedType } from '@/Types/Feed.type'
import { FeedContextType } from '@/Types/Contexts/FeedContext.type'

const INITIAL_FEED: FeedType[] = []

const FeedContext = createContext<FeedContextType>({} as FeedContextType)

const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState<FeedType[]>(INITIAL_FEED)

  return (
    <FeedContext.Provider value={{ feed, setFeed }}>
      {children}
    </FeedContext.Provider>
  )
}

export { FeedProvider, FeedContext }
