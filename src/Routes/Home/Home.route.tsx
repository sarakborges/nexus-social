import { SuggestionsProvider } from '@/Contexts/Suggestions.context'

import { PageWrapperComponent } from '@/Components/App/PageWrapper'
import { FeedComponent } from '@/Components/App/Feed'

import { HomeSuggestionsComponent } from '@/Components/App/HomeSuggestions'

import './Home.style.scss'

export const HomeRoute = () => (
  <PageWrapperComponent>
    <main className="home-route">
      <FeedComponent />

      <SuggestionsProvider>
        <HomeSuggestionsComponent />
      </SuggestionsProvider>
    </main>
  </PageWrapperComponent>
)
