import {
  FIELD_TYPE_CHECKBOX,
  FIELD_TYPE_PASSWORD,
  FIELD_TYPE_RADIO,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'

export type FormType = {
  submitText: string

  sections: Array<{
    id: string
    title?: string

    fields: Array<{
      name: string
      label: string
      placeholder: string
      type:
        | typeof FIELD_TYPE_TEXT
        | typeof FIELD_TYPE_TEXTAREA
        | typeof FIELD_TYPE_CHECKBOX
        | typeof FIELD_TYPE_PASSWORD
        | typeof FIELD_TYPE_RADIO
        | typeof FIELD_TYPE_SELECT
    }>
  }>
}
