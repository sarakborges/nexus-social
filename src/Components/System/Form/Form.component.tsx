import React, { FormHTMLAttributes, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'
import { ModalComponent } from '@/Components/System/Modal'
import { TypographyComponent } from '@/Components/System/Typography'
import { LoadingComponent } from '@/Components/System/Loading'

import { FORM_ERROR_BUTTON, FORM_ERROR_TITLE } from '@/Consts/Form.const'

import { FormType } from '@/Types/Form.type'

import './Form.style.scss'

export const FormComponent = ({
  children,
  ...rest
}: FormType & FormHTMLAttributes<HTMLFormElement>) => {
  const navigate = useNavigate()
  const [modalErrorMessage, setModalErrorMessage] = useState('')
  const [errors, setErrors] = useState<{ [propName: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const { submitText, sections, onSubmit, ...formProps } = rest

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

  const handleError = ({
    errorMessage,
    errors,
    e
  }: {
    errorMessage: string
    errors: {
      [propName: string]: string
    }
    e: eventType
  }) => {
    if (!errorMessage) {
      return
    }

    setModalErrorMessage(errorMessage)
    setErrors(errors)
    toggleErrorModal(e)
  }

  const handleRedirect = (redirectUri: string) => {
    if (!redirectUri) {
      return
    }

    navigate(redirectUri)
  }

  const clearError = (fieldName: string) => {
    if (!errors) {
      setErrors({})
      return
    }

    const { [fieldName]: field, ...otherErrors } = errors
    setErrors(otherErrors)
  }

  const doSubmit = async (e) => {
    e.preventDefault()

    setErrors({})

    setIsLoading(true)
    const submitResponse = await onSubmit?.(e)
    setIsLoading(false)

    if (!submitResponse) {
      return
    }

    const { redirectUri, errorMessage, errors } = submitResponse

    handleError({ errorMessage, e, errors })
    handleRedirect(redirectUri)
  }

  return (
    <>
      <form className="form" {...formProps} onSubmit={doSubmit}>
        {sections.map((sectionItem) => (
          <section key={`form-section-${sectionItem.id}`}>
            {sectionItem.title && (
              <TypographyComponent renderAs="h2">
                {sectionItem.title}
              </TypographyComponent>
            )}

            <main className="form-fields">
              {sectionItem.fields.map((fieldItem) => (
                <FieldComponent
                  key={fieldItem.name}
                  error={errors?.[fieldItem.name] || ''}
                  onChange={() => {
                    clearError(fieldItem.name)
                  }}
                  {...fieldItem}
                />
              ))}
            </main>
          </section>
        ))}

        <ButtonComponent type="submit" disabled={isLoading}>
          {!isLoading && submitText}
          {!!isLoading && <LoadingComponent />}
        </ButtonComponent>
      </form>

      <ModalComponent ref={errorModalRef} title={FORM_ERROR_TITLE}>
        <div className="error-modal">
          <TypographyComponent>{modalErrorMessage}</TypographyComponent>

          <ButtonComponent onClick={toggleErrorModal}>
            {FORM_ERROR_BUTTON}
          </ButtonComponent>
        </div>
      </ModalComponent>
    </>
  )
}
