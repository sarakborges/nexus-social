import { ROUTES } from '@/Consts/Routes.const'

import { FeedType } from '@/Types/Feed.type'

import { FEED_PUBLISHED_AT } from '@/Consts/Feed.const'

import { LinkComponent } from '@/Components/System/Link'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { ImageComponent } from '@/Components/System/Image'

import './FeedItem.style.scss'

export const FeedItemComponent = ({ feedData }: { feedData: FeedType }) => {
  const { profile, content, picture, date } = feedData
  const { uri, name, picture: profilePicture } = profile[0]

  const feedItemDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(date))

  return (
    <li className="feed-item">
      <CardComponent>
        <section className="feed-item-header">
          <LinkComponent to={ROUTES.PROFILE.path.replace(':id', uri)}>
            <ImageComponent
              alt={name}
              src={profilePicture || '/avatar-placeholder.png'}
              rounded
              square
            />
          </LinkComponent>

          <div className="feed-item-header-user-id">
            <TypographyComponent>
              <LinkComponent to={ROUTES.PROFILE.path.replace(':id', uri)}>
                {name}
              </LinkComponent>
            </TypographyComponent>

            <TypographyComponent smallText>
              {`${FEED_PUBLISHED_AT} ${feedItemDate}`}
            </TypographyComponent>
          </div>
        </section>

        <main>
          {picture && <ImageComponent alt="Picture" src={picture} square />}
          {content && <TypographyComponent>{content}</TypographyComponent>}
        </main>
      </CardComponent>
    </li>
  )
}
