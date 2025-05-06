import { FeedType } from '@/Types/Feed.type'

export type FeedListType = {
  feed: FeedType[]
  setFeed: (newFeed: FeedType[]) => void
}
