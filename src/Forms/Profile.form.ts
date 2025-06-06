import { FormHTMLAttributes } from 'react'

import * as UsersAPI from '@/Apis/Users'
import * as ProfilesAPI from '@/Apis/Profiles'

import { FormType } from '@/Types/Form.type'

import { FIELD_TYPE_TEXT } from '@/Consts/FieldTypes.const'
import {
  REGISTER_NAME_PLACEHOLDER,
  REGISTER_PICTURE_LABEL,
  REGISTER_PICTURE_PLACEHOLDER,
  REGISTER_URI_LABEL,
  REGISTER_URI_PLACEHOLDER
} from '@/Consts/Register.const'
import { ROUTES } from '@/Consts/Routes.const'
import { PROFILE_FORM_BUTTON } from '@/Consts/ProfileForm.const'

export const PROFILE_FORM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: PROFILE_FORM_BUTTON,

  onSubmit: async (e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const { name, uri, picture } = Object.fromEntries(formData) as {
      name: string
      uri: string
      picture: string
    }

    if (![name, uri, picture].every(Boolean)) {
      const response = {
        errorMessage: `Todos os campos são obrigatórios.`,

        errors: {
          name: !name ? `Campo obrigatório` : ``,
          uri: !uri ? `Campo obrigatório` : ``,
          picture: !picture ? `Campo obrigatório` : ``
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

    const createProfileResponse = await ProfilesAPI.createProfile({
      name,
      uri,
      picture,
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
          placeholder: REGISTER_PICTURE_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        }
      ]
    }
  ]
}
