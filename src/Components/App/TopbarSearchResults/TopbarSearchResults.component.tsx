import { Fragment, use } from 'react'

import { TOPBAR_SEARCH_RESULTS_TITLES } from '@/Consts/Topbar.const'

import { TopbarSearchContext } from '@/Contexts/TopbarSearch.context'

import { TopbarSearchResultItemComponent } from '@/Components/App/TopbarSearchResultItem'
import { TypographyComponent } from '@/Components/System/Typography'

import './TopbarSearchResults.style.scss'

export const TopbarSearchResultsComponent = () => {
  const topbarSearchContext = use(TopbarSearchContext)

  if (!topbarSearchContext) {
    return <></>
  }

  const { searchResults } = topbarSearchContext

  return (
    <div className="topbar-search-results">
      {searchResults.map((searchResultType) => (
        <Fragment key={`topbar-search-results-type-${searchResultType.type}`}>
          <TypographyComponent>
            {TOPBAR_SEARCH_RESULTS_TITLES[searchResultType.type]}
          </TypographyComponent>

          <ul>
            {searchResultType.items.map((searchResultItem) => (
              <TopbarSearchResultItemComponent
                key={`topbar-search-result-item-${searchResultItem.uri}`}
                resultItem={searchResultItem}
                type={searchResultType.type}
              />
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  )
}
