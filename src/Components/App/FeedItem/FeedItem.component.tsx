import { ROUTES } from '@/Consts/Routes.const'

import { FeedType } from '@/Types/Feed.type'

import { LinkComponent } from '@/Components/System/Link'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'

import './FeedItem.style.scss'
import { ImageComponent } from '@/Components/System/Image'

export const FeedItemComponent = ({ feedData }: { feedData: FeedType }) => {
  const { profile, content, picture } = feedData

  return (
    <li className="feed-item">
      <CardComponent>
        <section className="feed-item-header">
          <LinkComponent to={ROUTES.PROFILE.path.replace(':id', profile.uri)}>
            <ImageComponent
              alt={profile.name}
              src={profile.picture || '/avatar-placeholder.png'}
              rounded
              square
            />
          </LinkComponent>

          <div className="feed-item-header-user-id">
            <TypographyComponent>
              <LinkComponent
                to={ROUTES.PROFILE.path.replace(':id', profile.uri)}
              >
                {profile.name}
              </LinkComponent>
            </TypographyComponent>

            <TypographyComponent>
              <LinkComponent
                to={ROUTES.PROFILE.path.replace(':id', profile.uri)}
              >
                {`@${profile.uri}`}
              </LinkComponent>
            </TypographyComponent>
          </div>
        </section>

        <main>
          {picture && <ImageComponent alt="Picture" src={picture} square />}
          {content && <TypographyComponent>{content}</TypographyComponent>}
        </main>

        <footer>
          <TypographyComponent>05/11/2024 - 15:03</TypographyComponent>
        </footer>
      </CardComponent>
    </li>
  )
}
