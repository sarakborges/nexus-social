import { createContext, useState } from 'react'

import {
  AllowedTypes,
  TopbarSearchContextType
} from '@/Types/Contexts/TopbarSearchContext.type'
import { TopbarSearchResultsType } from '@/Types/TopbarSearchResults.type'

const INITIAL_SEARCH_RESULTS: Array<TopbarSearchResultsType> = [
  {
    type: 'profile',
    items: [
      {
        _id: '1',
        name: 'hope.',
        uri: 'hopyumm',
        picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/first-blood67e450dcccc7c.png`
      },

      {
        _id: '2',
        name: 'doom.',
        uri: 'doomyumm',
        picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/doomyum6816297e9e8ce.png`
      },

      {
        _id: '4',
        name: 'barbatos.',
        uri: 'il-vento-dubriaco',
        picture: `https://image.yoble.us/avatar/il-vento-dubriaco6823c2196347d.png`
      }
    ]
  }
]

const TopbarSearchContext = createContext<TopbarSearchContextType>(
  {} as TopbarSearchContextType
)

const TopbarSearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [allowedTypes, setAllowedTypes] = useState<AllowedTypes>('all')
  const [searchResults, setSearchResults] = useState<
    Array<TopbarSearchResultsType>
  >(INITIAL_SEARCH_RESULTS)

  return (
    <TopbarSearchContext.Provider
      value={{
        searchResults,
        searchTerm,
        allowedTypes,
        setSearchResults,
        setSearchTerm,
        setAllowedTypes
      }}
    >
      {children}
    </TopbarSearchContext.Provider>
  )
}

export { TopbarSearchProvider, TopbarSearchContext }
