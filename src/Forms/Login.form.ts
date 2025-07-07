import { FormHTMLAttributes } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { getTexts } from '@/Texts'

import { FormType } from '@/Types/Form.type'

import { FIELD_TYPE_PASSWORD, FIELD_TYPE_TEXT } from '@/Consts/FieldTypes.const'
import { ROUTES } from '@/Consts/Routes.const'

export const LOGIN_FORM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: getTexts('LOGIN_BUTTON'),

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

    await localStorage.setItem('nexus-token', loginResponse.token)

    const response = {
      redirectUri: ROUTES.HOME.path,
      reloadUser: true
    }

    return response
  },

  sections: [
    {
      id: 'login',
      fields: [
        {
          name: 'email',
          label: getTexts('LOGIN_EMAIL_PLACEHOLDER'),
          placeholder: getTexts('LOGIN_EMAIL_PLACEHOLDER'),
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'password',
          label: getTexts('LOGIN_PASSWORD_PLACEHOLDER'),
          placeholder: getTexts('LOGIN_PASSWORD_PLACEHOLDER'),
          type: FIELD_TYPE_PASSWORD
        }
      ]
    }
  ]
}
