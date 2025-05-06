import { FormHTMLAttributes } from 'react'
import { useNavigate } from 'react-router'

import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'

import { FormType } from '@/Types/Form.type'

import './Form.style.scss'

export const FormComponent = ({
  children,
  ...rest
}: FormType & FormHTMLAttributes<HTMLFormElement>) => {
  const navigate = useNavigate()

  const { submitText, fields, onSubmit, redirectUri, ...formProps } = rest

  const doSubmit = (e) => {
    e.preventDefault()

    const isSubmitSuccessful = onSubmit?.(e)

    if (!isSubmitSuccessful) {
      return
    }

    if (!redirectUri) {
      return
    }

    navigate(redirectUri)
  }

  return (
    <form className="form" {...formProps} onSubmit={doSubmit}>
      {fields.map((fieldItem) => (
        <FieldComponent key={fieldItem.name} {...fieldItem} />
      ))}

      <ButtonComponent type="submit">{submitText}</ButtonComponent>
    </form>
  )
}
