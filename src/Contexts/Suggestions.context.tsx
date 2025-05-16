import { createContext, useState } from 'react'

import {
  SUGGESTION_TYPE_GROUP,
  SUGGESTION_TYPE_PROFILE
} from '@/Consts/Suggestions.const'

import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from '@/Types/Group.type'
import { SuggestionsContextType } from '@/Types/SuggestionsContext.type'
import { SuggestionType } from '@/Types/Suggestion.type'

const INITIAL_PROFILE_SUGGESTIONS: ProfileType[] = [
  {
    id: '1',
    name: 'hope.',
    uri: 'hopyumm',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/first-blood67e450dcccc7c.png`,
    connectionsInCommon: 3
  },

  {
    id: '2',
    name: 'doom.',
    uri: 'doomyumm',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/avatar/thumb/doomyum6816297e9e8ce.png`,
    connectionsInCommon: 7
  },

  {
    id: '4',
    name: 'barbatos.',
    uri: 'il-vento-dubriaco',
    picture: `https://image.yoble.us/avatar/il-vento-dubriaco6823c2196347d.png`,
    connectionsInCommon: 7
  }
]

const INITIAL_GROUP_SUGGESTIONS: GroupType[] = [
  {
    id: '1',
    name: 'add condomínio de piranhas',
    uri: 'condominio-piranhas',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/community/281766/photo/add-condominio-de-piranhas6801da3a12299.png`,
    connectionsAsMembers: 5
  },

  {
    id: '2',
    name: 'buscas interpretativas',
    uri: 'buscas-interpretativas',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/community/281769/photo/buscas-interpretativas638f631017376.png`,
    connectionsAsMembers: 4
  },

  {
    id: '3',
    name: '.',
    uri: 'deposito-de-hopes',
    picture: `https://imageyobleus.nyc3.cdn.digitaloceanspaces.com/community/303456/photo/6807ffc6d528a.jpg`,
    connectionsAsMembers: 14
  }
]

const SuggestionsContext = createContext<SuggestionsContextType | null>(null)

const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState<Array<SuggestionType>>([
    {
      list: INITIAL_PROFILE_SUGGESTIONS,
      type: SUGGESTION_TYPE_PROFILE
    },

    {
      list: INITIAL_GROUP_SUGGESTIONS,
      type: SUGGESTION_TYPE_GROUP
    }
  ])

  return (
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  )
}

export { SuggestionsProvider, SuggestionsContext }
