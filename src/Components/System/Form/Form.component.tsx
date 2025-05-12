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

  const { submitText, fields, onSubmit, ...formProps } = rest

  const doSubmit = async (e) => {
    e.preventDefault()

    const submitResponse = await onSubmit?.(e)

    if (!submitResponse) {
      return
    }

    const { redirectUri, error } = submitResponse

    if (!!error) {
      alert(error)
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
