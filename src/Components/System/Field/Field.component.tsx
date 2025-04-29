import {
  FIELD_TYPE_INPUT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'

import { SelectComponent } from '@/Components/System/Select'

import { FieldComponentType } from './Field.type'

import './Field.style.scss'

const Input = ({ ...rest }: FieldComponentType) => {
  return <input className="field" {...rest} />
}

const Textarea = ({ ...rest }: FieldComponentType) => {
  return <textarea className="field" {...rest} />
}

export const FieldComponent = ({
  options,
  renderAs,
  ...rest
}: FieldComponentType) => {
  const components = {
    [FIELD_TYPE_INPUT]: <Input {...rest} />,
    [FIELD_TYPE_SELECT]: <SelectComponent options={options} {...rest} />,
    [FIELD_TYPE_TEXTAREA]: <Textarea {...rest} />
  }

  return components[renderAs || FIELD_TYPE_INPUT]
}
