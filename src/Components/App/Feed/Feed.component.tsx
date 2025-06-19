import { NewPostComponent } from '@/Components/App/NewPost'
import { FeedListComponent } from '@/Components/App/FeedList'

import './Feed.style.scss'

export const FeedComponent = () => {
  return (
    <section className="feed">
      <NewPostComponent />
      <FeedListComponent />
    </section>
  )
}
