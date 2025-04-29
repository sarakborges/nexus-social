import { PageWrapperComponent } from '@/Components/App/PageWrapper'
import { NewPostComponent } from '@/Components/App/NewPost'

import { HomeSuggestionsComponent } from '@/Components/App/HomeSuggestions'

import './Home.style.scss'

export const HomeRoute = () => (
  <PageWrapperComponent>
    <main className="home-route">
      <section className="feed">
        <NewPostComponent />
      </section>

      <HomeSuggestionsComponent />
    </main>
  </PageWrapperComponent>
)
