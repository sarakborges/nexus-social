import { useEffect, useState } from 'react'

import { PROFILE_FORM } from '@/Forms/Profile.form'

import { TypographyComponent } from '@/Components/System/Typography'
import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { ImageComponent } from '@/Components/System/Image'

import { PageWrapperComponent } from '@/Components/App/PageWrapper'

import './ProfileForm.style.scss'

export const ProfileFormRoute = () => {
  const [name, setName] = useState('')
  const [picture, setPicture] = useState('')

  useEffect(() => {
    const nameEl = document.querySelector('#name')
    nameEl?.addEventListener('change', (e) => {
      const value = (e.target as HTMLInputElement).value
      setName(value)
    })

    const pictureEl = document.querySelector('#picture')
    pictureEl?.addEventListener('change', (e) => {
      const value = (e.target as HTMLInputElement).value
      setPicture(value)
    })
  }, [])

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
              src={picture || '/avatar-placeholder.png'}
              alt={name}
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
