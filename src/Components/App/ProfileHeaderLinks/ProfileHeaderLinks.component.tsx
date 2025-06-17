import { use } from 'react'
import { FaLink } from 'react-icons/fa'

import { ProfileContext } from '@/Contexts/Profile.context'

import { TypographyComponent } from '@/Components/System/Typography'

import './ProfileHeaderLinks.style.scss'

export const ProfileHeaderLinksComponent = () => {
  const { profile } = use(ProfileContext)

  if (!profile?.links) {
    return <></>
  }

  return (
    <ul className="profile-header-links">
      {profile?.links?.map((linkItem) => (
        <li key={`profile-links-${linkItem.label}`}>
          <a href={linkItem.uri} target="_blank" rel="noreferrer noopener">
            <FaLink />

            <TypographyComponent>{linkItem.label}</TypographyComponent>
          </a>
        </li>
      ))}
    </ul>
  )
}
