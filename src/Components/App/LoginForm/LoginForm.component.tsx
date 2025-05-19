import { LOGIN_NO_ACCOUNT, LOGIN_TITLE } from '@/Consts/Login.const'

import { LOGIN_FORM } from '@/Forms/Login.form'

import { ROUTES } from '@/Consts/Routes.const'

import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ImageComponent } from '@/Components/System/Image'

import './LoginForm.style.scss'

export const LoginFormComponent = () => {
  return (
    <section className="login-form">
      <CardComponent>
        <ImageComponent alt="Nexus" src="/logo.png" />

        <TypographyComponent renderAs="h1">{LOGIN_TITLE}</TypographyComponent>
        <FormComponent {...LOGIN_FORM} />

        <section className="login-navigation">
          <LinkComponent to={ROUTES.REGISTER.path}>
            {LOGIN_NO_ACCOUNT}
          </LinkComponent>
        </section>
      </CardComponent>
    </section>
  )
}
