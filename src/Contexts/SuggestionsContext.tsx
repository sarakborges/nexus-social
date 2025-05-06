import { createContext, useState } from 'react'

import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from '@/Types/Group.type'
import { SuggestionsListType } from '@/Types/SuggestionsList.type'

const INITIAL_PROFILE_SUGGESTIONS: ProfileType[] = [
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
  }
]

const INITIAL_GROUP_SUGGESTIONS: GroupType[] = [
  {
    id: '1',
    name: 'add condomínio de piranhas',
    uri: 'condominio-piranhas',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/community/281766/photo/add-condominio-de-piranhas6801da3a12299.png`
  },

  {
    id: '2',
    name: 'buscas interpretativas',
    uri: 'buscas-interpretativas',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/community/281769/photo/buscas-interpretativas638f631017376.png`
  }
]

const SuggestionsContext = createContext<SuggestionsListType | null>(null)

const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState<{
    profiles: ProfileType[]
    groups: GroupType[]
  }>({
    profiles: INITIAL_PROFILE_SUGGESTIONS,
    groups: INITIAL_GROUP_SUGGESTIONS
  })

  return (
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  )
}

export { SuggestionsProvider, SuggestionsContext }
