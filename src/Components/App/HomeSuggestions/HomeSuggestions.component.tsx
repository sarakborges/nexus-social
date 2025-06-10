import { use, useEffect, useState } from 'react'

import * as SuggestionsApi from '@/Apis/Suggestions'

import { SuggestionsContext } from '@/Contexts/Suggestions.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { SuggestionsComponent } from '@/Components/App/Suggestions'

import './HomeSuggestions.style.scss'

export const HomeSuggestionsComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)
  const [isLoading, setIsLoading] = useState(false)

  const { suggestions, setSuggestions } = use(SuggestionsContext)

  const getSuggestions = async () => {
    if (!activeProfile?._id) {
      return
    }

    setIsLoading(true)
    const suggestionsRequest = await SuggestionsApi.getSuggestions(
      activeProfile._id
    )
    setIsLoading(false)

    if (!suggestionsRequest) {
      return
    }

    setSuggestions(suggestionsRequest)
  }

  useEffect(() => {
    getSuggestions()
  }, [activeProfile?._id])

  return (
    <section className="home-suggestions">
      {suggestions.map((suggestionsList) => (
        <SuggestionsComponent
          key={`${suggestionsList.type}-suggestions-list`}
          suggestions={suggestionsList.suggestions}
          type={suggestionsList.type}
          isLoading={isLoading}
        />
      ))}
    </section>
  )
}
