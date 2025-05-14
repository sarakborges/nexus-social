import { SuggestionType } from './Suggestion.type'

export type SuggestionsListType = {
  suggestions: Array<SuggestionType>
  setSuggestions: (newSuggestions: Array<SuggestionType>) => void
}
