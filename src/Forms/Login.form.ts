import { FormHTMLAttributes } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { FormType } from '@/Types/Form.type'

import { FIELD_TYPE_PASSWORD, FIELD_TYPE_TEXT } from '@/Consts/FieldTypes.const'
import {
  LOGIN_BUTTON,
  LOGIN_EMAIL_PLACEHOLDER,
  LOGIN_PASSWORD_PLACEHOLDER
} from '@/Consts/Login.const'
import { ROUTES } from '@/Consts/Routes.const'

export const LOGIN_FORM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: LOGIN_BUTTON,

  onSubmit: async (e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const { email, password } = Object.fromEntries(formData) as {
      email: string
      password: string
    }

    if (!email || !password) {
      const response = {
        errorMessage: `Campos email e senha são obrigatórios.`,

        errors: {
          email: !email ? `Campo obrigatório` : ``,
          password: !password ? `Campo obrigatório` : ``
        }
      }

      return response
    }

    const loginResponse = await UsersAPI.loginUser({
      email,
      password
    })

    if (!loginResponse) {
      const response = {
        errorMessage: `Falha no login. Verifique as informações inseridas e tente novamente.`
      }

      return response
    }

    localStorage.setItem('nexus-token', loginResponse.token)
    localStorage.setItem('user-id', loginResponse.user._id)

    const response = {
      redirectUri: ROUTES.HOME.path
    }

    return response
  },

  sections: [
    {
      id: 'login',
      fields: [
        {
          name: 'email',
          label: LOGIN_EMAIL_PLACEHOLDER,
          placeholder: LOGIN_EMAIL_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'password',
          label: LOGIN_PASSWORD_PLACEHOLDER,
          placeholder: LOGIN_PASSWORD_PLACEHOLDER,
          type: FIELD_TYPE_PASSWORD
        }
      ]
    }
  ]
}
