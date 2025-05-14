import { use } from 'react'

import { SuggestionsContext } from '@/Contexts/Suggestions.context'

import { ROUTES } from '@/Consts/Routes.const'

import { SuggestionComponent } from '@/Components/App/Suggestion'

import './HomeSuggestions.style.scss'

export const HomeSuggestionsComponent = () => {
  const suggestionsContext = use(SuggestionsContext)

  if (!suggestionsContext?.suggestions) {
    return <></>
  }

  const {
    suggestions: { profiles, groups }
  } = suggestionsContext

  return (
    <section className="home-suggestions">
      <SuggestionComponent
        title={'Conexões sugeridas'}
        to={ROUTES.PROFILE.path.replace(':id', 'hopyumm')}
        options={profiles}
      />

      <SuggestionComponent
        title={'Grupos sugeridos'}
        to={ROUTES.PROFILE.path.replace(':id', 'hopyumm')}
        options={groups}
      />
    </section>
  )
}
