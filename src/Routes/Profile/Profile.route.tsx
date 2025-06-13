import { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import * as ProfilesAPI from '@/Apis/Profiles'

import { ProfileContext } from '@/Contexts/Profile.context'

import { LoadingComponent } from '@/Components/System/Loading'
import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'

import { PageWrapperComponent } from '@/Components/App/PageWrapper'

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
        <main className="profile-route">
          <section className="profile-info">
            <header>
              <ImageComponent
                src={profile?.picture || `/avatar-placeholder.png`}
                alt={profile?.name}
                rounded
                square
              />

              <main>
                <TypographyComponent renderAs="h1">
                  {profile?.name}
                </TypographyComponent>

                <TypographyComponent renderAs="h2">{`@${profile?.uri}`}</TypographyComponent>

                <TypographyComponent renderAs="p">
                  {profile?.bio}
                </TypographyComponent>
              </main>
            </header>
          </section>

          <section></section>
        </main>
      )}
    </PageWrapperComponent>
  )
}
