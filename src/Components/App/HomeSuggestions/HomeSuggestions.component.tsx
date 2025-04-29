import { ROUTES } from '@/Consts/Routes.const'

import { SuggestionComponent } from '@/Components/App/Suggestion'

import './HomeSuggestions.style.scss'

export const HomeSuggestionsComponent = () => (
  <section className="home-suggestions">
    <SuggestionComponent
      title={'Conexões sugeridas'}
      to={ROUTES.PROFILE.path.replace(':id', 'hopyumm')}
      options={[
        { name: 'Hope Borges', url: 'hopyumm' },
        { name: 'Doom Borges', url: 'doomyumm' }
      ]}
    />

    <SuggestionComponent
      title={'Grupos sugeridos'}
      to={ROUTES.PROFILE.path.replace(':id', 'hopyumm')}
      options={[
        { name: 'add condomínio de piranhas', url: 'condominio-piranhas' },
        { name: 'buscas interpretativas', url: 'buscas-interpretativas' }
      ]}
    />
  </section>
)
