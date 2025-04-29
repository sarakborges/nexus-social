import { FormComponentType } from './Form.type'

import './Form.style.scss'

export const FormComponent = ({ children, ...rest }: FormComponentType) => {
  const { onSubmit } = rest

  const doSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <form className="form" {...rest} onSubmit={doSubmit}>
      {children}
    </form>
  )
}
