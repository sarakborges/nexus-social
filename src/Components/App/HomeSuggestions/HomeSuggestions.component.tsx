import { use } from 'react'

import {
  SUGGESTION_TYPE_GROUP,
  SUGGESTION_TYPE_PROFILE,
  SUGGESTIONS_CONNECTIONS_TITLE,
  SUGGESTIONS_GROUPS_TITLE
} from '@/Consts/Suggestions.const'

import { SuggestionsContext } from '@/Contexts/Suggestions.context'

import { SuggestionsComponent } from '@/Components/App/Suggestions'

import './HomeSuggestions.style.scss'

export const HomeSuggestionsComponent = () => {
  const suggestionsContext = use(SuggestionsContext)

  if (!suggestionsContext?.suggestions) {
    return <></>
  }

  const { suggestions } = suggestionsContext

  return (
    <section className="home-suggestions">
      {suggestions.map((suggestionsList) => (
        <SuggestionsComponent
          key={`${suggestionsList.type}-suggestions-list`}
          suggestions={suggestionsList.list}
          type={suggestionsList.type}
        />
      ))}
    </section>
  )
}
