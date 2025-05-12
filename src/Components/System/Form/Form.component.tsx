import React, { FormHTMLAttributes, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'
import { ModalComponent } from '@/Components/System/Modal'
import { TypographyComponent } from '@/Components/System/Typography'

import { FormType } from '@/Types/Form.type'

import './Form.style.scss'

export const FormComponent = ({
  children,
  ...rest
}: FormType & FormHTMLAttributes<HTMLFormElement>) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { submitText, fields, onSubmit, ...formProps } = rest

  type eventType = MouseEvent | React.MouseEvent

  const errorModalRef = useRef<{
    toggleModal: (e: eventType) => void
  } | null>(null)

  const toggleErrorModal = (e: eventType) => {
    if (!errorModalRef?.current) {
      return
    }

    errorModalRef?.current?.toggleModal(e)
  }

  const handleError = ({ error, e }: { error: string; e: eventType }) => {
    if (!error) {
      return
    }

    setErrorMessage(error)
    toggleErrorModal(e)
  }

  const handleRedirect = (redirectUri: string) => {
    if (!redirectUri) {
      return
    }

    navigate(redirectUri)
  }

  const doSubmit = async (e) => {
    e.preventDefault()

    const submitResponse = await onSubmit?.(e)

    if (!submitResponse) {
      return
    }

    const { redirectUri, error } = submitResponse

    handleError({ error, e })
    handleRedirect(redirectUri)
  }

  return (
    <>
      <form className="form" {...formProps} onSubmit={doSubmit}>
        {fields.map((fieldItem) => (
          <FieldComponent key={fieldItem.name} {...fieldItem} />
        ))}

        <ButtonComponent type="submit">{submitText}</ButtonComponent>
      </form>

      <ModalComponent ref={errorModalRef} title="Erro">
        <div className="error-modal">
          <TypographyComponent>{errorMessage}</TypographyComponent>
          <ButtonComponent onClick={toggleErrorModal}>Ok</ButtonComponent>
        </div>
      </ModalComponent>
    </>
  )
}
