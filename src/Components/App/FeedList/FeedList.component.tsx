import { use } from 'react'

import { FeedContext } from '@/Contexts/Feed.context'

import { TypographyComponent } from '@/Components/System/Typography'

import { FeedItemComponent } from '@/Components/App/FeedItem'

import './FeedList.style.scss'

export const FeedListComponent = () => {
  const { feed } = use(FeedContext)

  return (
    <>
      {!!feed?.length && (
        <ul className="feed-list">
          {feed.map((feedItem) => (
            <FeedItemComponent
              key={`feed-item-${feedItem._id}`}
              feedData={feedItem}
            />
          ))}
        </ul>
      )}

      {!feed?.length && (
        <div className="no-feed">
          <TypographyComponent renderAs="h2">
            Nenhuma novidade no seu feed!
          </TypographyComponent>
        </div>
      )}
    </>
  )
}
