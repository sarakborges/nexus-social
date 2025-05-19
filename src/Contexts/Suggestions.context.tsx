import { createContext, useEffect, useState } from 'react'

import * as SuggestionsApi from '@/Apis/Suggestions'

import { SuggestionsContextType } from '@/Types/Contexts/SuggestionsContext.type'
import { SuggestionType } from '@/Types/Suggestion.type'

const SuggestionsContext = createContext<SuggestionsContextType>(
  {} as SuggestionsContextType
)

const SuggestionsProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState<Array<SuggestionType>>([])

  useEffect(() => {
    const getSuggestions = async () => {
      const suggestionsRequest = await SuggestionsApi.getSuggestions()

      if (!suggestionsRequest) {
        return
      }

      setSuggestions(suggestionsRequest)
    }

    getSuggestions()
  }, [])

  return (
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  )
}

export { SuggestionsProvider, SuggestionsContext }
