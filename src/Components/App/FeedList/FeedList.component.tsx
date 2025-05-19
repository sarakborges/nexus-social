import { use } from 'react'

import { FeedContext } from '@/Contexts/Feed.context'

import { FeedItemComponent } from '@/Components/App/FeedItem'

import './FeedList.style.scss'

export const FeedListComponent = () => {
  const { feed } = use(FeedContext)

  return (
    <ul className="feed-list">
      {feed.map((feedItem) => (
        <FeedItemComponent key={feedItem.id} feedData={feedItem} />
      ))}
    </ul>
  )
}
