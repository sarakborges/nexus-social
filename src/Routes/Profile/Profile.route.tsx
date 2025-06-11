import { use, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import * as ProfilesAPI from '@/Apis/Profiles'

import { ProfileContext } from '@/Contexts/Profile.context'

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
      return
    }

    setProfile(profileRequest)
  }

  useEffect(() => {
    getProfile()
  }, [uri])

  return (
    <PageWrapperComponent>
      <main className="profile-route">{isLoading ? 'nau' : profile.name}</main>
    </PageWrapperComponent>
  )
}
