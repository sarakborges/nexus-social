import { SuggestionType } from '@/Types/Suggestion.type'

export type SuggestionsContextType = {
  suggestions: Array<SuggestionType>
  setSuggestions: (newSuggestions: Array<SuggestionType>) => void
}
