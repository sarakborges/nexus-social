import { ROUTES } from '@/Consts/Routes.const'

import { ProfileType } from '@/Types/Profile.type'

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
  options: ProfileType[]
}) => (
  <CardComponent className="suggestion">
    <header>
      <TypographyComponent>{title}</TypographyComponent>
      <LinkComponent to={to}>Ver todas sugestões</LinkComponent>
    </header>

    <ul>
      {options.map((optionItem) => (
        <li key={optionItem.uri}>
          <LinkComponent to={ROUTES.PROFILE.path}>
            <ImageComponent
              src={optionItem.picture || '/avatar-placeholder.png'}
              alt={optionItem.name}
              rounded
              square
            />
          </LinkComponent>

          <section>
            <LinkComponent to={to}>
              <TypographyComponent>{optionItem.name}</TypographyComponent>
              <TypographyComponent>@{optionItem.uri}</TypographyComponent>
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
