import { createContext, useState } from 'react'

import { SuggestionsContextType } from '@/Types/Contexts/SuggestionsContext.type'
import { SuggestionType } from '@/Types/Suggestion.type'

const SuggestionsContext = createContext<SuggestionsContextType>(
  {} as SuggestionsContextType
)

const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState<Array<SuggestionType>>([])

  return (
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  )
}

export { SuggestionsProvider, SuggestionsContext }
