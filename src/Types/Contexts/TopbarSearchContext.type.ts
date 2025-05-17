import { TopbarSearchResultsType } from '@/Types/TopbarSearchResults.type'

export type TopbarSearchContextType = {
  searchTerm: string
  searchResults: Array<TopbarSearchResultsType>
  setSearchTerm: (term: string) => void
  setSearchResults: (results: Array<TopbarSearchResultsType>) => void
}
