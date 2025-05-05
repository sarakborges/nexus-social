import { FormHTMLAttributes } from 'react'

import { ROUTES } from '@/Consts/Routes.const'
import {
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_PASSWORD,
  FIELD_TYPE_RADIO,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'

export type FormComponentType = {
  submitText: string

  fields: {
    name: string
    placeholder: string
    type:
      | typeof FIELD_TYPE_TEXT
      | typeof FIELD_TYPE_TEXTAREA
      | typeof FIELD_TYPE_CHECKBOX
      | typeof FIELD_TYPE_PASSWORD
      | typeof FIELD_TYPE_RADIO
      | typeof FIELD_TYPE_SELECT
  }[]

  redirectUri?:
    | typeof ROUTES.HOME.path
    | typeof ROUTES.LOGIN.path
    | typeof ROUTES.MESSAGES.path
    | typeof ROUTES.MY_PROFILES.path
    | typeof ROUTES.PROFILE.path
    | typeof ROUTES.PROFILE_CONNECTIONS.path
    | typeof ROUTES.PROFILE_GROUPS.path
} & FormHTMLAttributes<HTMLFormElement>
