import { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import * as ProfilesAPI from '@/Apis/Profiles'

import { ProfileContext } from '@/Contexts/Profile.context'

import { LoadingComponent } from '@/Components/System/Loading'

import { PageWrapperComponent } from '@/Components/App/PageWrapper'
import { ProfileHeaderComponent } from '@/Components/App/ProfileHeader'

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
            <ProfileHeaderComponent />
          </section>

          <section></section>
        </main>
      )}
    </PageWrapperComponent>
  )
}
