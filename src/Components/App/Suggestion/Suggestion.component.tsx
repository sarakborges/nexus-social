import { ROUTES } from '@/Consts/Routes.const'

import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ImageComponent } from '@/Components/System/Image'

import './Suggestion.style.scss'

export const SuggestionComponent = ({
  title,
  to,
  options
}: {
  title: string
  to: string
  options: {
    name: string
    url: string
  }[]
}) => (
  <CardComponent className="suggestion">
    <header>
      <TypographyComponent>{title}</TypographyComponent>
      <LinkComponent to={to}>Ver todas sugestões</LinkComponent>
    </header>

    <ul>
      {options.map((optionItem) => (
        <li key={optionItem.url}>
          <LinkComponent to={ROUTES.PROFILE.path}>
            <ImageComponent
              src="/avatar-placeholder.png"
              alt="User"
              rounded
              square
            />
          </LinkComponent>

          <section>
            <LinkComponent to={to}>
              <TypographyComponent>{optionItem.name}</TypographyComponent>
              <TypographyComponent>@{optionItem.url}</TypographyComponent>
            </LinkComponent>
          </section>

          <LinkComponent to={to} asButton>
            Visualizar
          </LinkComponent>
        </li>
      ))}
    </ul>
  </CardComponent>
)
