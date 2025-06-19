import { createContext, useState } from 'react'

import { FeedType } from '@/Types/Feed.type'
import { FeedContextType } from '@/Types/Contexts/FeedContext.type'

const FeedContext = createContext<FeedContextType>({} as FeedContextType)

const FeedProvider = ({ children }) => {
  const [feed, setFeed] = useState<FeedType[]>([])

  return (
    <FeedContext.Provider value={{ feed, setFeed }}>
      {children}
    </FeedContext.Provider>
  )
}

export { FeedProvider, FeedContext }
