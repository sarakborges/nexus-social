import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'

import { FormComponentType } from './Form.type'

import './Form.style.scss'

export const FormComponent = ({ children, ...rest }: FormComponentType) => {
  const { submitText, fields, onSubmit } = rest

  const doSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form className="form" {...rest} onSubmit={doSubmit}>
      {fields.map((fieldItem) => (
        <FieldComponent {...fieldItem} />
      ))}

      <ButtonComponent type="submit">{submitText}</ButtonComponent>
    </form>
  )
}
