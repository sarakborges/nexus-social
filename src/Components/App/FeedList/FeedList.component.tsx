import { use } from 'react'

import { FeedContext } from '@/Contexts/FeedContext'

import { FeedItemComponent } from '@/Components/App/FeedItem'

import './FeedList.style.scss'

export const FeedListComponent = () => {
  const feedContext = use(FeedContext)

  if (!feedContext?.feed?.length) {
    return <></>
  }

  const { feed } = feedContext

  return (
    <ul className="feed-list">
      {feed.map((feedItem) => (
        <FeedItemComponent key={feedItem.id} feedData={feedItem} />
      ))}
    </ul>
  )
}
