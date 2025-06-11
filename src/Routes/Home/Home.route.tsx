import { use } from 'react'

import { ROUTES } from '@/Consts/Routes.const'

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
                  Crie um perfil para começar a usar o Nexus!
                </TypographyComponent>

                <LinkComponent to={ROUTES.NEW_PROFILE.path} asButton>
                  Clique aqui para criar seu perfil
                </LinkComponent>
              </>
            )}

            {!!user?.profiles?.length && (
              <>
                <TypographyComponent renderAs="h2">
                  Selecione um perfil para começar a usar o Nexus!
                  <br />
                  Clique no ícone no canto inferior esquerdo da barra lateral.
                </TypographyComponent>
              </>
            )}
          </div>
        )}
      </main>
    </PageWrapperComponent>
  )
}
