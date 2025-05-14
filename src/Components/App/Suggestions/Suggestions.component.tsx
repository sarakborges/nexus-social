import { ROUTES } from '@/Consts/Routes.const'
import {
  SUGGESTION_TYPE_GROUP,
  SUGGESTION_TYPE_PROFILE,
  SUGGESTIONS_CONNECTIONS_TITLE,
  SUGGESTIONS_GROUPS_TITLE,
  SUGGESTIONS_SEE_ALL
} from '@/Consts/Suggestions.const'

import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from '@/Types/Group.type'

import { CardComponent } from '@/Components/System/Card'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'

import { SuggestionItemComponent } from '@/Components/App/SuggestionItem'

import './Suggestions.style.scss'

export const SuggestionsComponent = ({
  suggestions,
  type
}: {
  suggestions: ProfileType[] | GroupType[]
  type: typeof SUGGESTION_TYPE_PROFILE | typeof SUGGESTION_TYPE_GROUP
}) => {
  const getSuggestionsTitle = () => {
    if (type === SUGGESTION_TYPE_PROFILE) {
      return SUGGESTIONS_CONNECTIONS_TITLE
    }

    if (type === SUGGESTION_TYPE_GROUP) {
      return SUGGESTIONS_GROUPS_TITLE
    }
  }

  const getLinkUri = () => {
    if (type === SUGGESTION_TYPE_PROFILE) {
      return ROUTES.SUGGESTIONS_PROFILE.path
    }

    if (type === SUGGESTION_TYPE_GROUP) {
      return ROUTES.SUGGESTIONS_GROUPS.path
    }
  }

  const title = getSuggestionsTitle()
  const linkUri = getLinkUri()

  return (
    <CardComponent className="suggestions">
      <header>
        <TypographyComponent>{title}</TypographyComponent>
        <LinkComponent to={linkUri!}>{SUGGESTIONS_SEE_ALL}</LinkComponent>
      </header>

      <ul>
        {suggestions.map((suggestionItem) => (
          <SuggestionItemComponent
            key={suggestionItem.id}
            suggestion={suggestionItem}
            type={type}
          />
        ))}
      </ul>
    </CardComponent>
  )
}
