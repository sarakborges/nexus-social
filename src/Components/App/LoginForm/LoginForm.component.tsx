import { useNavigate } from 'react-router'

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
        <TypographyComponent renderAs="h1">
          Welcome to the Nexus!
        </TypographyComponent>

        <FormComponent onSubmit={doLogin}>
          <FieldComponent name="username" />
          <FieldComponent name="password" type="password" />
          <ButtonComponent type="submit">Login</ButtonComponent>
        </FormComponent>

        <section className="login-navigation">
          <LinkComponent to={ROUTES.LOGIN.path}>
            No account? Create one now!
          </LinkComponent>
        </section>
      </CardComponent>
    </section>
  )
}
