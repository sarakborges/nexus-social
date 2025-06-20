import { use, useState } from 'react'
import { FaTrash } from 'react-icons/fa'

import * as FeedAPI from '@/Apis/Feed'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { FeedContext } from '@/Contexts/Feed.context'

import { ROUTES } from '@/Consts/Routes.const'

import { FeedType } from '@/Types/Feed.type'

import { FEED_PUBLISHED_AT } from '@/Consts/Feed.const'

import { LinkComponent } from '@/Components/System/Link'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { ImageComponent } from '@/Components/System/Image'
import { ButtonComponent } from '@/Components/System/Button'
import { LoadingComponent } from '@/Components/System/Loading'

import './FeedItem.style.scss'

export const FeedItemComponent = ({ feedData }: { feedData: FeedType }) => {
  const { activeProfile } = use(ActiveProfileContext)
  const { feed, setFeed } = use(FeedContext)

  const [isLoading, setIsLoading] = useState(false)

  const { _id, profile, content, picture, createdAt } = feedData
  const { _id: profileId, uri, name, picture: profilePicture } = profile

  const feedItemDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(createdAt))

  const deleteFeedItem = async () => {
    setIsLoading(true)
    const deleteFeedItemRequest = await FeedAPI.deleteFeedItem(_id)
    setIsLoading(false)

    if (!deleteFeedItemRequest) {
      return
    }

    setFeed([...feed].filter((feedItem) => feedItem._id !== _id))
  }

  return (
    <li className="feed-item">
      <CardComponent>
        <section className="feed-item-header">
          <main>
            <LinkComponent to={ROUTES.PROFILE.path.replace(':uri', uri)}>
              <ImageComponent
                alt={name}
                src={profilePicture || '/avatar-placeholder.png'}
                rounded
                square
              />
            </LinkComponent>

            <div className="feed-item-header-user-id">
              <TypographyComponent>
                <LinkComponent to={ROUTES.PROFILE.path.replace(':uri', uri)}>
                  {name}
                </LinkComponent>
              </TypographyComponent>

              <TypographyComponent smallText>
                {`${FEED_PUBLISHED_AT} ${feedItemDate}`}
              </TypographyComponent>
            </div>
          </main>

          {activeProfile?._id === profileId && (
            <ButtonComponent square transparent onClick={deleteFeedItem}>
              {!!isLoading && <LoadingComponent />}
              {!isLoading && <FaTrash />}
            </ButtonComponent>
          )}
        </section>

        <main>
          {picture && <ImageComponent alt="Picture" src={picture} square />}
          {content && <TypographyComponent>{content}</TypographyComponent>}
        </main>
      </CardComponent>
    </li>
  )
}
