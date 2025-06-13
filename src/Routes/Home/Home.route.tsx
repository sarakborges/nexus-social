import { use } from 'react'

import { ROUTES } from '@/Consts/Routes.const'
import {
  CREATE_PROFILE_BUTTON,
  CREATE_PROFILE_CTA,
  SELECT_PROFILE_CTA
} from '@/Consts/Home.const'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'

import { PageWrapperComponent } from '@/Components/App/PageWrapper'
import { FeedComponent } from '@/Components/App/Feed'
import { HomeSuggestionsComponent } from '@/Components/App/HomeSuggestions'

import './Home.style.scss'

export const HomeRoute = () => {
  const { user } = use(UserContext)
  const { activeProfile } = use(ActiveProfileContext)

  return (
    <PageWrapperComponent>
      <main className="home-route">
        {!!activeProfile?._id && (
          <>
            <FeedComponent />
            <HomeSuggestionsComponent />
          </>
        )}

        {!activeProfile?._id && (
          <div className="home-no-profile">
            {!user?.profiles?.length && (
              <>
                <TypographyComponent renderAs="h2">
                  {CREATE_PROFILE_CTA}
                </TypographyComponent>

                <LinkComponent to={ROUTES.NEW_PROFILE.path} asButton>
                  {CREATE_PROFILE_BUTTON}
                </LinkComponent>
              </>
            )}

            {!!user?.profiles?.length && (
              <>
                <TypographyComponent renderAs="h2">
                  {SELECT_PROFILE_CTA}
                </TypographyComponent>
              </>
            )}
          </div>
        )}
      </main>
    </PageWrapperComponent>
  )
}
