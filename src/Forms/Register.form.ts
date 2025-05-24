import { FormHTMLAttributes } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { FormType } from '@/Types/Form.type'

import { FIELD_TYPE_PASSWORD, FIELD_TYPE_TEXT } from '@/Consts/FieldTypes.const'
import {
  REGISTER_BUTTON,
  REGISTER_EMAIL_PLACEHOLDER,
  REGISTER_NAME_PLACEHOLDER,
  REGISTER_PASSWORD_PLACEHOLDER,
  REGISTER_PICTURE_LABEL,
  REGISTER_PICTURE_PLACEHOLDER,
  REGISTER_URI_LABEL,
  REGISTER_URI_PLACEHOLDER
} from '@/Consts/Register.const'
import { ROUTES } from '@/Consts/Routes.const'

export const REGISTER_FORM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: REGISTER_BUTTON,

  onSubmit: async (e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const {
      email,
      password,
      ['profile-name']: profileName,
      ['profile-uri']: profileUri,
      ['profile-picture']: profilePicture
    } = Object.fromEntries(formData) as {
      email: string
      password: string
      'profile-name': string
      'profile-uri': string
      'profile-picture': string
    }

    if (
      ![email, password, profileName, profileUri, profilePicture].every(Boolean)
    ) {
      const response = {
        errorMessage: `Todos os campos são obrigatórios.`,

        errors: {
          email: !email ? `Campo obrigatório` : ``,
          password: !password ? `Campo obrigatório` : ``,
          ['profile-name']: !profileName ? `Campo obrigatório` : ``,
          ['profile-uri']: !profileUri ? `Campo obrigatório` : ``,
          ['profile-picture']: !profilePicture ? `Campo obrigatório` : ``
        }
      }

      return response
    }

    const registerResponse = await UsersAPI.registerUser({
      email,
      password,
      profile: {
        id: '1',
        name: profileName,
        uri: profileUri,
        picture: profilePicture
      }
    })

    if (!registerResponse) {
      const response = {
        errorMessage: `Falha ao cadastrar. Verifique as informações inseridas e tente novamente.`
      }

      return response
    }

    localStorage.setItem('nexus-token', 'nice')
    localStorage.setItem('user-id', registerResponse.id)

    const response = {
      redirectUri: ROUTES.HOME.path
    }

    return response
  },

  sections: [
    {
      id: 'access',
      title: 'Dados de login',
      fields: [
        {
          name: 'email',
          label: REGISTER_EMAIL_PLACEHOLDER,
          placeholder: REGISTER_EMAIL_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'password',
          label: REGISTER_PASSWORD_PLACEHOLDER,
          placeholder: REGISTER_PASSWORD_PLACEHOLDER,
          type: FIELD_TYPE_PASSWORD
        }
      ]
    },

    {
      id: 'profile',
      title: 'Dados do perfil',
      fields: [
        {
          name: 'profile-name',
          label: REGISTER_NAME_PLACEHOLDER,
          placeholder: REGISTER_NAME_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'profile-uri',
          label: REGISTER_URI_LABEL,
          placeholder: REGISTER_URI_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'profile-picture',
          label: REGISTER_PICTURE_LABEL,
          placeholder: REGISTER_PICTURE_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        }
      ]
    }
  ]
}
