import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes
} from 'react'

import {
  FIELD_TYPE_INPUT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'

export type FieldComponentType = {
  renderAs?:
    | typeof FIELD_TYPE_INPUT
    | typeof FIELD_TYPE_SELECT
    | typeof FIELD_TYPE_TEXTAREA
  options?: {
    label: string
    value: string
  }[]
} & (InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>)
