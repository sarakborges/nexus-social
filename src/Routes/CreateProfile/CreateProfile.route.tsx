import { PageWrapperComponent } from '@/Components/App/PageWrapper'
import { ProfileFormComponent } from '@/Components/App/ProfileForm'

export const CreateProfileRoute = () => {
  return (
    <PageWrapperComponent>
      <ProfileFormComponent />
    </PageWrapperComponent>
  )
}
