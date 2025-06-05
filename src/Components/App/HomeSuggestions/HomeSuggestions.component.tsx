import { use, useEffect } from 'react'

import * as SuggestionsApi from '@/Apis/Suggestions'

import { SuggestionsContext } from '@/Contexts/Suggestions.context'

import { SuggestionsComponent } from '@/Components/App/Suggestions'

import './HomeSuggestions.style.scss'

export const HomeSuggestionsComponent = () => {
  const { suggestions, setSuggestions } = use(SuggestionsContext)

  useEffect(() => {
    const getSuggestions = async () => {
      return
      const suggestionsRequest = await SuggestionsApi.getSuggestions()

      if (!suggestionsRequest) {
        return
      }

      setSuggestions(suggestionsRequest)
    }

    getSuggestions()
  }, [])

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
