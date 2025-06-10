import { use, useEffect, useState } from 'react'

import * as FeedAPI from '@/Apis/Feed'

import { FeedContext } from '@/Contexts/Feed.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TypographyComponent } from '@/Components/System/Typography'
import { LoadingComponent } from '@/Components/System/Loading'

import { FeedItemComponent } from '@/Components/App/FeedItem'

import './FeedList.style.scss'

export const FeedListComponent = () => {
  const { feed, setFeed } = use(FeedContext)
  const { activeProfile } = use(ActiveProfileContext)
  const [isLoading, setIsLoading] = useState(false)

  const getFeed = async () => {
    if (!activeProfile?._id) {
      return
    }

    setIsLoading(true)
    const feedResponse = await FeedAPI.getFeedByProfile(activeProfile?._id)
    setIsLoading(false)

    if (!feedResponse?.length) {
      return
    }

    setFeed(feedResponse)
  }

  useEffect(() => {
    getFeed()
  }, [activeProfile?._id])

  return (
    <>
      {!!isLoading && <LoadingComponent />}

      {!isLoading && (
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
      )}
    </>
  )
}
