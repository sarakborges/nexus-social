import { Fragment, use } from 'react'

import {
  TOPBAR_SEARCH_NO_RESULTS,
  TOPBAR_SEARCH_RESULTS_TITLES
} from '@/Consts/Topbar.const'

import { TopbarSearchContext } from '@/Contexts/TopbarSearch.context'

import { TopbarSearchResultItemComponent } from '@/Components/App/TopbarSearchResultItem'
import { TypographyComponent } from '@/Components/System/Typography'

import './TopbarSearchResults.style.scss'

export const TopbarSearchResultsComponent = () => {
  const topbarSearchContext = use(TopbarSearchContext)

  if (!topbarSearchContext) {
    return <></>
  }

  const { searchResults, allowedTypes } = topbarSearchContext

  return (
    <div className="topbar-search-results">
      {searchResults.filter(
        (searchResultType) =>
          allowedTypes === 'all' || searchResultType.type === allowedTypes
      ).length > 0 ? (
        <>
          {searchResults
            .filter(
              (searchResultType) =>
                allowedTypes === 'all' || searchResultType.type === allowedTypes
            )
            .map((searchResultType) => (
              <Fragment
                key={`topbar-search-results-type-${searchResultType.type}`}
              >
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
        </>
      ) : (
        <div className="topbar-search-no-results">
          <TypographyComponent>{TOPBAR_SEARCH_NO_RESULTS}</TypographyComponent>
        </div>
      )}
    </div>
  )
}
