import { use } from 'react'

import { PROFILE_FORM } from '@/Forms/Profile.form'

import { FIELD_TYPE_FILE } from '@/Consts/FieldTypes.const'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TypographyComponent } from '@/Components/System/Typography'
import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { ImageComponent } from '@/Components/System/Image'
import { FieldComponent } from '@/Components/System/Field'

import './ProfileForm.style.scss'
import { readAsBase64 } from '@/Utils/ReadAsBase64.util'
import { ButtonComponent } from '@/Components/System/Button'

export const ProfileFormComponent = ({ isEdit }: { isEdit?: boolean }) => {
  const { activeProfile } = use(ActiveProfileContext)

  if (!!isEdit && !activeProfile?._id) {
    return <></>
  }

  const { connectionsInCommon, ...activeProfileRest } = activeProfile

  const initialValues = isEdit
    ? {
        ...activeProfileRest
      }
    : {}

  const changeProfilePicture = async (e) => {
    const pictureBase64 = await readAsBase64(
      (e.target as HTMLInputElement).files?.[0] as File
    )

    const newPicture = pictureBase64.replace(
      'data:application/octet-stream;base64,',
      ''
    )

    const pictureEl = document.querySelector(
      '#profile-picture'
    ) as HTMLImageElement
    pictureEl.src = newPicture

    const pictureInputEl = document.querySelector(
      '#picture'
    ) as HTMLInputElement
    pictureInputEl.value = newPicture
  }

  const openPictureSelector = () => {
    const pictureInputEl = document.querySelector(
      '#fake-picture'
    ) as HTMLInputElement

    if (!pictureInputEl) {
      return
    }

    pictureInputEl.click()
  }

  const removePicture = () => {
    const pictureEl = document.querySelector(
      '#profile-picture'
    ) as HTMLImageElement
    pictureEl.src = '/avatar-placeholder.png'

    const pictureInputEl = document.querySelector(
      '#picture'
    ) as HTMLInputElement
    pictureInputEl.value = ''
  }

  return (
    <main className="profile-form">
      <TypographyComponent renderAs="h1">
        {`${isEdit ? 'Editar' : 'Criar novo'} perfil`}
      </TypographyComponent>

      <CardComponent>
        <FormComponent
          {...PROFILE_FORM}
          initialValues={initialValues}
        ></FormComponent>

        <section className="profile-picture-changer">
          <main>
            <FieldComponent
              id="fake-picture"
              type={FIELD_TYPE_FILE}
              onChange={changeProfilePicture}
            />

            <ImageComponent
              id="profile-picture"
              src={
                (!!isEdit && activeProfile?.picture) ||
                '/avatar-placeholder.png'
              }
              alt={''}
              square
              rounded
            />
          </main>

          <ButtonComponent onClick={openPictureSelector}>
            Selecionar foto
          </ButtonComponent>

          <ButtonComponent cancel onClick={removePicture}>
            Remover foto
          </ButtonComponent>
        </section>
      </CardComponent>
    </main>
  )
}
