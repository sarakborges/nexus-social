import { use, useEffect } from 'react'

import * as FeedAPI from '@/Apis/Feed'

import { FeedContext } from '@/Contexts/Feed.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { FeedItemComponent } from '@/Components/App/FeedItem'

import './FeedList.style.scss'

export const FeedListComponent = () => {
  const { feed, setFeed } = use(FeedContext)
  const { activeProfile } = use(ActiveProfileContext)

  const getFeed = async () => {
    if (!activeProfile?.id) {
      return
    }

    const feedResponse = await FeedAPI.getFeedByProfile(activeProfile?.id)

    if (!feedResponse?.length) {
      return
    }

    setFeed(feedResponse)
  }

  useEffect(() => {
    getFeed()
  }, [activeProfile?.id])

  return (
    <ul className="feed-list">
      {feed.map((feedItem) => (
        <FeedItemComponent key={feedItem.id} feedData={feedItem} />
      ))}
    </ul>
  )
}
