import { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import * as ProfilesAPI from '@/Apis/Profiles'

import { ProfileContext } from '@/Contexts/Profile.context'

import { LoadingComponent } from '@/Components/System/Loading'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'

import { PageWrapperComponent } from '@/Components/App/PageWrapper'
import { ProfileHeaderComponent } from '@/Components/App/ProfileHeader'
import { SuggestionItemComponent } from '@/Components/App/SuggestionItem'
import { ProfileTabsComponent } from '@/Components/App/ProfileTabs'

import './Profile.style.scss'

export const ProfileRoute = () => {
  const { uri } = useParams()
  const { profile, setProfile } = use(ProfileContext)

  const [isLoading, setIsLoading] = useState(false)

  const getProfile = async () => {
    if (!uri) {
      return
    }

    setIsLoading(true)
    const profileRequest = await ProfilesAPI.getProfileByUri(uri)
    setIsLoading(false)

    if (!profileRequest?._id) {
      setProfile({
        _id: '',
        name: '',
        uri: '',
        userId: ''
      })

      return
    }

    setProfile(profileRequest)
  }

  useEffect(() => {
    getProfile()
  }, [uri])

  if (!profile) {
    return <></>
  }

  return (
    <PageWrapperComponent>
      {!!isLoading && (
        <div className="no-profile">
          <LoadingComponent />
        </div>
      )}

      {!isLoading && (
        <div className="profile-route">
          <main className="profile-main">
            <ProfileHeaderComponent />
            <ProfileTabsComponent />
          </main>

          <section className="profile-lists">
            <CardComponent className="suggestions">
              <header>
                <TypographyComponent>{'Conexões'}</TypographyComponent>
                <LinkComponent to={''}>{'Ver todas'}</LinkComponent>
              </header>

              <ul>
                {profile?.connections?.map((connectionItem) => (
                  <SuggestionItemComponent
                    suggestion={connectionItem?.otherProfile}
                    type={'profile'}
                  />
                ))}
              </ul>
            </CardComponent>

            <CardComponent className="suggestions">
              <header>
                <TypographyComponent>{'Grupos'}</TypographyComponent>
                <LinkComponent to={''}>{'Ver todos'}</LinkComponent>
              </header>

              <ul>
                {profile?.groups?.map((groupItem) => (
                  <SuggestionItemComponent
                    suggestion={groupItem}
                    type={'group'}
                  />
                ))}
              </ul>
            </CardComponent>
          </section>
        </div>
      )}
    </PageWrapperComponent>
  )
}
