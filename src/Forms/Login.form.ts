import { useNavigate } from 'react-router'

import { FormComponentType } from '@/Components/System/Form/Form.type'

import { FIELD_TYPE_PASSWORD, FIELD_TYPE_TEXT } from '@/Consts/FieldTypes.const'
import {
  LOGIN_BUTTON,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_USERNAME_PLACEHOLDER
} from '@/Consts/Login.const'
import { ROUTES } from '@/Consts/Routes.const'

const navigate = useNavigate()

export const LOGIN_FORM: FormComponentType = {
  submitText: LOGIN_BUTTON,

  onSubmit: (e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const { username, password } = Object.fromEntries(formData)

    if (!!username && !!password) {
      localStorage.setItem('nexus-token', 'nice')
      localStorage.setItem('userId', '1')

      navigate(ROUTES.HOME.path)
    }
  },

  fields: [
    {
      name: 'username',
      placeholder: LOGIN_USERNAME_PLACEHOLDER,
      type: FIELD_TYPE_TEXT
    },

    {
      name: 'password',
      placeholder: LOGIN_PASSWORD_PLACEHOLDER,
      type: FIELD_TYPE_PASSWORD
    }
  ]
}
