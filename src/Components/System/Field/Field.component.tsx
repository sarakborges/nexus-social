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
  error,
  options,
  renderAs,
  ...rest
}: FieldComponentType) => {
  const wrapperClasses = ['field-wrapper', error ? 'field-error' : '']
    .filter(Boolean)
    .join(' ')

  const components = {
    [FIELD_TYPE_TEXT]: <Input id={rest.name} {...rest} />,
    [FIELD_TYPE_SELECT]: (
      <SelectComponent id={rest.name} options={options} {...rest} />
    ),
    [FIELD_TYPE_TEXTAREA]: <Textarea id={rest.name} {...rest} />
  }

  return (
    <div className="field-component">
      {!!label && (
        <label className="label" htmlFor={rest.name}>
          {label}
        </label>
      )}

      <div className={wrapperClasses}>
        {components[renderAs || FIELD_TYPE_TEXT]}
      </div>

      {!!error && (
        <label className="error" htmlFor={rest.name}>
          {error}
        </label>
      )}
    </div>
  )
}
