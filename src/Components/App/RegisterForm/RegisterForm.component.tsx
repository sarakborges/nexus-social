import { ROUTES } from '@/Consts/Routes.const'
import { REGISTER_GO_BACK, REGISTER_TITLE } from '@/Consts/Register.const'

import { REGISTER_FORM } from '@/Forms/Register.form'

import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'

import './RegisterForm.style.scss'

export const RegisterFormComponent = () => {
  return (
    <section className="register-form">
      <CardComponent>
        <TypographyComponent renderAs="h1">
          {REGISTER_TITLE}
        </TypographyComponent>

        <FormComponent {...REGISTER_FORM} />

        <section className="register-navigation">
          <LinkComponent to={ROUTES.LOGIN.path}>
            {REGISTER_GO_BACK}
          </LinkComponent>
        </section>
      </CardComponent>
    </section>
  )
}
