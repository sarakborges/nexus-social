import { FeedType } from '@/Types/Feed.type'

export type FeedContextType = {
  feed: FeedType[]
  setFeed: (newFeed: FeedType[]) => void
}
