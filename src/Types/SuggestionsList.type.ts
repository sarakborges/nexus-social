import { GroupType } from './Group.type'
import { ProfileType } from './Profile.type'

export type SuggestionsListType = {
  suggestions: {
    profiles: ProfileType[]
    groups: GroupType[]
  }
  setSuggestions: (newSuggestions: {
    profiles: ProfileType[]
    groups: GroupType[]
  }) => void
}
