import { PROFILE_FORM } from '@/Forms/Profile.form'

import { TypographyComponent } from '@/Components/System/Typography'
import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { ImageComponent } from '@/Components/System/Image'

import { PageWrapperComponent } from '@/Components/App/PageWrapper'

import './ProfileForm.style.scss'

export const ProfileFormRoute = () => {
  return (
    <PageWrapperComponent>
      <main className="profile-form-route">
        <TypographyComponent renderAs="h1">
          Criar novo perfil
        </TypographyComponent>

        <CardComponent>
          <FormComponent {...PROFILE_FORM}></FormComponent>

          <section>
            <ImageComponent
              id="profile-picture"
              src={'/avatar-placeholder.png'}
              alt={''}
              square
              rounded
            />

            <TypographyComponent>
              É assim que fica a sua foto!
            </TypographyComponent>
          </section>
        </CardComponent>
      </main>
    </PageWrapperComponent>
  )
}
