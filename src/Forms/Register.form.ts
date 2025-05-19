import { FormHTMLAttributes } from 'react'

import * as UsersAPI from '@/Apis/Users'

import { FormType } from '@/Types/Form.type'

import { FIELD_TYPE_PASSWORD, FIELD_TYPE_TEXT } from '@/Consts/FieldTypes.const'
import {
  REGISTER_BUTTON,
  REGISTER_EMAIL_PLACEHOLDER,
  REGISTER_PASSWORD_PLACEHOLDER
} from '@/Consts/Register.const'
import { ROUTES } from '@/Consts/Routes.const'

export const REGISTER_FORM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: REGISTER_BUTTON,

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

    const registerResponse = await UsersAPI.registerUser({
      email,
      password
    })

    console.log(registerResponse)

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
}
