import { useNavigate } from 'react-router'

import {
  LOGIN_BUTTON,
  LOGIN_NO_ACCOUNT,
  LOGIN_PASSWORD_PLACEHOLDER,
  LOGIN_TITLE,
  LOGIN_USERNAME_PLACEHOLDER
} from '@/Consts/Login.const'

import { ROUTES } from '@/Consts/Routes.const'

import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'
import { LinkComponent } from '@/Components/System/Link'

import './LoginForm.style.scss'

export const LoginFormComponent = () => {
  const navigate = useNavigate()

  const doLogin = (e) => {
    const formData = new FormData(e.target)

    const { username, password } = Object.fromEntries(formData)

    if (!!username && !!password) {
      localStorage.setItem('nexus-token', 'nice')
      localStorage.setItem('userId', '1')

      navigate(ROUTES.HOME.path)
    }
  }

  return (
    <section className="login-form">
      <CardComponent>
        <TypographyComponent renderAs="h1">{LOGIN_TITLE}</TypographyComponent>

        <FormComponent onSubmit={doLogin}>
          <FieldComponent
            name="username"
            placeholder={LOGIN_USERNAME_PLACEHOLDER}
          />
          <FieldComponent
            name="password"
            type="password"
            placeholder={LOGIN_PASSWORD_PLACEHOLDER}
          />
          <ButtonComponent type="submit">{LOGIN_BUTTON}</ButtonComponent>
        </FormComponent>

        <section className="login-navigation">
          <LinkComponent to={ROUTES.LOGIN.path}>
            {LOGIN_NO_ACCOUNT}
          </LinkComponent>
        </section>
      </CardComponent>
    </section>
  )
}
