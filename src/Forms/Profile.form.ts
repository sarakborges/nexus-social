import { FormHTMLAttributes } from 'react'

import * as UsersAPI from '@/Apis/Users'
import * as ProfilesAPI from '@/Apis/Profiles'

import { FormType } from '@/Types/Form.type'

import {
  FIELD_TYPE_FILE,
  FIELD_TYPE_TEXT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'
import {
  REGISTER_BIO_LABEL,
  REGISTER_BIO_PLACEHOLDER,
  REGISTER_NAME_PLACEHOLDER,
  REGISTER_PICTURE_LABEL,
  REGISTER_URI_LABEL,
  REGISTER_URI_PLACEHOLDER
} from '@/Consts/Register.const'
import { ROUTES } from '@/Consts/Routes.const'
import { PROFILE_FORM_BUTTON } from '@/Consts/ProfileForm.const'
import { readAsBase64 } from '@/Utils/ReadAsBase64.util'

export const PROFILE_FORM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: PROFILE_FORM_BUTTON,

  onSubmit: async (e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const { name, uri, picture, bio } = Object.fromEntries(formData) as {
      name: string
      uri: string
      bio: string
      picture: File
    }

    if (![name, uri].every(Boolean)) {
      const response = {
        errorMessage: `Preencha todos os campos obrigatórios.`,

        errors: {
          name: !name ? `Campo obrigatório` : ``,
          uri: !uri ? `Campo obrigatório` : ``
        }
      }

      return response
    }

    const userId = localStorage.getItem('user-id')
      ? Number(localStorage.getItem('user-id'))
      : undefined

    if (!userId) {
      const response = {
        errorMessage: `Falha ao criar perfil. Verifique se você está logado e tente novamente.`
      }

      return response
    }

    const pictureBase64 = (await readAsBase64(picture)) as string

    const createProfileResponse = await ProfilesAPI.createProfile({
      name,
      uri,
      picture: pictureBase64,
      bio,
      userId
    })

    if (!createProfileResponse) {
      const response = {
        errorMessage: `Falha ao criar perfil. Verifique as informações inseridas e tente novamente.`
      }

      return response
    }

    const updateUserProfilesResponse = await UsersAPI.addProfileToUser({
      userId,
      profile: createProfileResponse.id
    })

    if (!updateUserProfilesResponse) {
      const response = {
        errorMessage: `Falha ao criar perfil. Verifique as informações inseridas e tente novamente.`
      }

      return response
    }

    const response = {
      redirectUri: ROUTES.HOME.path
    }

    return response
  },

  sections: [
    {
      id: 'profile',
      fields: [
        {
          name: 'name',
          label: REGISTER_NAME_PLACEHOLDER,
          placeholder: REGISTER_NAME_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'uri',
          label: REGISTER_URI_LABEL,
          placeholder: REGISTER_URI_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'picture',
          label: REGISTER_PICTURE_LABEL,
          type: FIELD_TYPE_FILE,
          onChange: async (e) => {
            const pictureBase64 = (await readAsBase64(
              (e.target as HTMLInputElement).files?.[0] as File
            )) as string

            const pictureEl = document.querySelector(
              '#profile-picture'
            ) as HTMLImageElement
            pictureEl.src = pictureBase64
          }
        },

        {
          name: 'bio',
          label: REGISTER_BIO_LABEL,
          placeholder: REGISTER_BIO_PLACEHOLDER,
          renderAs: FIELD_TYPE_TEXTAREA
        }
      ]
    }
  ]
}
