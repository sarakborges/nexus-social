import { getTexts } from '@/Texts'

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
        <ImageComponent alt={getTexts('APP_NAME')} src="/logo.png" />

        <TypographyComponent renderAs="h1">
          {getTexts('LOGIN_TITLE')}
        </TypographyComponent>
        <FormComponent {...LOGIN_FORM} />

        <section className="login-navigation">
          <LinkComponent to={ROUTES.REGISTER.path}>
            {getTexts('LOGIN_NO_ACCOUNT')}
          </LinkComponent>
        </section>
      </CardComponent>
    </section>
  )
}
