import { use } from 'react'

import { SuggestionsContext } from '@/Contexts/Suggestions.context'

import { SuggestionsComponent } from '@/Components/App/Suggestions'

import './HomeSuggestions.style.scss'

export const HomeSuggestionsComponent = () => {
  const { suggestions } = use(SuggestionsContext)

  return (
    <section className="home-suggestions">
      {suggestions?.map((suggestionsList) => (
        <SuggestionsComponent
          key={`${suggestionsList.type}-suggestions-list`}
          suggestions={suggestionsList.suggestions}
          type={suggestionsList.type}
        />
      ))}
    </section>
  )
}
