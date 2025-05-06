import {
  FIELD_TYPE_TEXT,
  FIELD_TYPE_SELECT,
  FIELD_TYPE_TEXTAREA
} from '@/Consts/FieldTypes.const'

import { SelectComponent } from '@/Components/System/Select'

import { FieldComponentType } from '@/Types/Components/FieldComponent.type'

import './Field.style.scss'

const Input = ({ ...rest }: FieldComponentType) => {
  return <input className="field" {...rest} />
}

const Textarea = ({ ...rest }: FieldComponentType) => {
  return <textarea className="field" {...rest} />
}

export const FieldComponent = ({
  label,
  options,
  renderAs,
  ...rest
}: FieldComponentType) => {
  const components = {
    [FIELD_TYPE_TEXT]: <Input id={rest.name} {...rest} />,
    [FIELD_TYPE_SELECT]: (
      <SelectComponent id={rest.name} options={options} {...rest} />
    ),
    [FIELD_TYPE_TEXTAREA]: <Textarea id={rest.name} {...rest} />
  }

  return (
    <div className="field-wrapper">
      {!!label && <label htmlFor={rest.name}>{label}</label>}
      {components[renderAs || FIELD_TYPE_TEXT]}
    </div>
  )
}
