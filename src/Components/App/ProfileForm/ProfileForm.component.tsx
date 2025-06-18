import { use, useEffect, useState } from 'react'
import { FaPencil } from 'react-icons/fa6'

import { ProfileFormType } from '@/Types/Profile.type'

import { readAsBase64 } from '@/Utils/ReadAsBase64.util'

import { PROFILE_FORM } from '@/Forms/Profile.form'

import { FIELD_TYPE_FILE } from '@/Consts/FieldTypes.const'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TypographyComponent } from '@/Components/System/Typography'
import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { ImageComponent } from '@/Components/System/Image'
import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'

import { ProfileFormLinksComponent } from '@/Components/App/ProfileFormLinks'

import './ProfileForm.style.scss'

export const ProfileFormComponent = ({ isEdit }: { isEdit?: boolean }) => {
  const { activeProfile } = use(ActiveProfileContext)
  const [initialValues, setInitialValues] = useState<
    ProfileFormType | undefined
  >()

  if (!!isEdit && !activeProfile?._id) {
    return <></>
  }

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

  useEffect(() => {
    if (!isEdit || !activeProfile?._id) {
      return
    }

    const { connectionsInCommon, ...activeProfileRest } = activeProfile

    setInitialValues({ ...activeProfileRest })
  }, [activeProfile?._id])

  return (
    <main className="profile-form">
      <TypographyComponent renderAs="h1">
        {`${isEdit ? 'Editar' : 'Criar novo'} perfil`}
      </TypographyComponent>

      <CardComponent>
        <FormComponent
          {...PROFILE_FORM}
          initialValues={initialValues}
          extraSections={[
            {
              id: 'profile-picture',
              title: 'Foto de perfil',
              content: (
                <section className="profile-picture-changer">
                  <label>
                    <FieldComponent
                      id="picture-file"
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

                    <span className="profile-picture-changer-icon">
                      <FaPencil />
                    </span>
                  </label>

                  <ButtonComponent cancel onClick={removePicture}>
                    Remover foto
                  </ButtonComponent>
                </section>
              )
            },

            {
              content: <ProfileFormLinksComponent isEdit={!!isEdit} />,
              id: 'profile-links',
              title: 'Links'
            }
          ]}
        />
      </CardComponent>
    </main>
  )
}
