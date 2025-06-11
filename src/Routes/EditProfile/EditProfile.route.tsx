import { PageWrapperComponent } from '@/Components/App/PageWrapper'
import { ProfileFormComponent } from '@/Components/App/ProfileForm'

export const EditProfileRoute = () => {
  return (
    <PageWrapperComponent>
      <ProfileFormComponent isEdit />
    </PageWrapperComponent>
  )
}
