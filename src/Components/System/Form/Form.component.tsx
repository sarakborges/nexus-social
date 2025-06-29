import React, { FormHTMLAttributes, use, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import * as UsersAPI from '@/Apis/Users'

import { UserContext } from '@/Contexts/User.context'
import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'
import { SuggestionsContext } from '@/Contexts/Suggestions.context'
import { FeedContext } from '@/Contexts/Feed.context'

import { FORM_ERROR_BUTTON, FORM_ERROR_TITLE } from '@/Consts/Form.const'
import { FIELD_TYPE_FILE } from '@/Consts/FieldTypes.const'

import { FormType } from '@/Types/Form.type'
import { FeedType } from '@/Types/Feed.type'

import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'
import { ModalComponent } from '@/Components/System/Modal'
import { TypographyComponent } from '@/Components/System/Typography'
import { LoadingComponent } from '@/Components/System/Loading'

import './Form.style.scss'

export const FormComponent = ({
  children,
  initialValues,
  hideSubmit,
  ...rest
}: FormType & FormHTMLAttributes<HTMLFormElement>) => {
  const navigate = useNavigate()
  const [modalErrorMessage, setModalErrorMessage] = useState('')
  const [errors, setErrors] = useState<{ [propName: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState(rest.sections[0].id)

  const { setUser } = use(UserContext)
  const { feed, setFeed } = use(FeedContext)
  const { setSuggestions } = use(SuggestionsContext)
  const { setActiveProfile } = use(ActiveProfileContext)

  const { submitText, sections, extraSections, onSubmit, ...formProps } = rest

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

  const handleReloadUser = async () => {
    setUser({
      _id: '',
      email: '',
      password: ''
    })

    setActiveProfile({
      _id: '',
      name: '',
      uri: '',
      userId: ''
    })

    setIsLoading(true)
    const userRequest = await UsersAPI.getUser()
    setIsLoading(false)

    if (!userRequest) {
      return
    }

    setUser(userRequest?.user)
    setFeed(userRequest?.feed)
    setSuggestions(userRequest?.suggestions)

    if (
      userRequest?.user.profiles.length < 1 ||
      !userRequest?.user.activeProfile
    ) {
      return
    }

    setActiveProfile(
      userRequest?.user.profiles.find(
        (profileItem) => profileItem._id === userRequest?.user.activeProfile
      )
    )
  }

  const updateFeed = (newFeedItem: FeedType) => {
    setFeed([newFeedItem, ...feed])
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

    const { redirectUri, errorMessage, errors, reloadUser, insertedFeed } =
      submitResponse

    if (!!insertedFeed) {
      await updateFeed(insertedFeed)
    }

    if (!!reloadUser) {
      await handleReloadUser()
    }

    handleError({ errorMessage, e, errors })
    handleRedirect(redirectUri)
  }

  const toggleFormSection = (sectionId: string) => {
    setActiveSection(sectionId)
  }

  return (
    <form {...formProps} onSubmit={doSubmit} className="form">
      {(sections?.length > 1 || !!extraSections?.length) && (
        <header className="form-header">
          <ul>
            {(!!extraSections?.length
              ? [...sections, ...extraSections]
              : [...sections]
            ).map((sectionItem) => (
              <li>
                <ButtonComponent
                  onClick={() => toggleFormSection(sectionItem.id)}
                  transparent={sectionItem.id !== activeSection}
                >
                  {sectionItem.title}
                </ButtonComponent>
              </li>
            ))}
          </ul>
        </header>
      )}

      <main className="form-body">
        {sections.map((sectionItem) => (
          <section
            key={`form-section-${sectionItem.id}`}
            className={`form-section ${
              activeSection === sectionItem.id ? 'active' : ''
            }`}
          >
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
                  hidden={!!fieldItem.hidden}
                  defaultValue={
                    fieldItem.type !== FIELD_TYPE_FILE
                      ? initialValues?.[fieldItem.name] || ''
                      : ''
                  }
                  {...fieldItem}
                />
              ))}
            </main>
          </section>
        ))}

        {!!extraSections?.length &&
          extraSections.map((sectionItem) => (
            <section
              key={`form-section-${sectionItem.id}`}
              className={`form-section ${
                activeSection === sectionItem.id ? 'active' : ''
              }`}
            >
              {sectionItem.title && (
                <TypographyComponent renderAs="h2">
                  {sectionItem.title}
                </TypographyComponent>
              )}

              {sectionItem.content}
            </section>
          ))}

        {!hideSubmit && (
          <ButtonComponent type="submit" disabled={isLoading}>
            {!isLoading && submitText}
            {!!isLoading && <LoadingComponent />}
          </ButtonComponent>
        )}

        <ModalComponent ref={errorModalRef} title={FORM_ERROR_TITLE}>
          <div className="error-modal">
            <TypographyComponent>{modalErrorMessage}</TypographyComponent>

            <ButtonComponent onClick={toggleErrorModal}>
              {FORM_ERROR_BUTTON}
            </ButtonComponent>
          </div>
        </ModalComponent>

        {children}
      </main>
    </form>
  )
}
