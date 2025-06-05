import { use, useEffect } from 'react'

import * as SuggestionsApi from '@/Apis/Suggestions'

import { SuggestionsContext } from '@/Contexts/Suggestions.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { SuggestionsComponent } from '@/Components/App/Suggestions'

import './HomeSuggestions.style.scss'

export const HomeSuggestionsComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

  if (!activeProfile?.id) {
    return <></>
  }

  const { suggestions, setSuggestions } = use(SuggestionsContext)

  useEffect(() => {
    const getSuggestions = async () => {
      const suggestionsRequest = await SuggestionsApi.getSuggestions(
        activeProfile.id
      )

      if (!suggestionsRequest) {
        return
      }

      setSuggestions(suggestionsRequest)
    }

    getSuggestions()
  }, [activeProfile])

  return (
    <section className="home-suggestions">
      {suggestions.map((suggestionsList) => (
        <SuggestionsComponent
          key={`${suggestionsList.type}-suggestions-list`}
          suggestions={suggestionsList.suggestions}
          type={suggestionsList.type}
        />
      ))}
    </section>
  )
}
