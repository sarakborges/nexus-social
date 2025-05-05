import { FormComponentType } from '@/Components/System/Form/Form.type'

import { FIELD_TYPE_PASSWORD, FIELD_TYPE_TEXT } from '@/Consts/FieldTypes.const'
import {
  LOGIN_BUTTON,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_USERNAME_PLACEHOLDER
} from '@/Consts/Login.const'
import { ROUTES } from '@/Consts/Routes.const'

export const LOGIN_FORM: FormComponentType = {
  submitText: LOGIN_BUTTON,
  redirectUri: ROUTES.HOME.path,

  onSubmit: (e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const { username, password } = Object.fromEntries(formData)

    if (!!username && !!password) {
      localStorage.setItem('nexus-token', 'nice')
      localStorage.setItem('userId', '1')
    }

    return true
  },

  fields: [
    {
      name: 'username',
      label: LOGIN_USERNAME_PLACEHOLDER,
      placeholder: LOGIN_USERNAME_PLACEHOLDER,
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
