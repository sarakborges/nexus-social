import { TopbarSearchResultsType } from '@/Types/TopbarSearchResults.type'

export type AllowedTypes = 'all' | 'profile' | 'group'

export type TopbarSearchContextType = {
  searchTerm: string
  searchResults: Array<TopbarSearchResultsType>
  allowedTypes: AllowedTypes
  setSearchTerm: (term: string) => void
  setSearchResults: (results: Array<TopbarSearchResultsType>) => void
  setAllowedTypes: (type: AllowedTypes) => void
}
