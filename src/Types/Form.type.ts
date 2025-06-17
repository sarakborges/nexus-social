import { ChangeEvent, JSX } from 'react'

import {
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_FILE,
  FIELD_TYPE_HIDDEN,
  FIELD_TYPE_PASSWORD,
  FIELD_TYPE_RADIO,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'

export type FormType = {
  submitText: string

  initialValues?: {
    [key: string]: string
  }

  extraSections?: Array<{
    id: string
    title?: string
    content: JSX.Element
  }>

  sections: Array<{
    id: string
    title?: string

    fields: Array<{
      name: string
      label?: string
      hidden?: boolean
      placeholder?: string
      onChange?: (e: ChangeEvent) => void
      renderAs?:
        | typeof FIELD_TYPE_TEXT
        | typeof FIELD_TYPE_SELECT
        | typeof FIELD_TYPE_TEXTAREA
      type?:
        | typeof FIELD_TYPE_TEXT
        | typeof FIELD_TYPE_FILE
        | typeof FIELD_TYPE_TEXTAREA
        | typeof FIELD_TYPE_CHECKBOX
        | typeof FIELD_TYPE_PASSWORD
        | typeof FIELD_TYPE_RADIO
        | typeof FIELD_TYPE_SELECT
        | typeof FIELD_TYPE_HIDDEN
    }>
  }>
}
