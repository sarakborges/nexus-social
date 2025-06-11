import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from 'react'

import {
  FIELD_TYPE_TEXT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'

export type FieldComponentType = {
  label?: string
  error?: string
  initialValue?: string
  renderAs?:
    | typeof FIELD_TYPE_TEXT
    | typeof FIELD_TYPE_SELECT
    | typeof FIELD_TYPE_TEXTAREA
  options?: {
    label: string
    value: string
  }[]
  hidden?: boolean
} & (InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>)
