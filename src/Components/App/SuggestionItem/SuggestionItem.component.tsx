import { ROUTES } from '@/Consts/Routes.const'
import {
  SUGGESTION_TYPE_GROUP,
  SUGGESTION_TYPE_PROFILE,
  SUGGESTIONS_CONNECTIONS_TEXT_COMMON,
  SUGGESTIONS_CONNECTIONS_TEXT_MULTIPLE,
  SUGGESTIONS_CONNECTIONS_TEXT_SINGLE,
  SUGGESTIONS_GROUPS_TEXT_COMMON,
  SUGGESTIONS_GROUPS_TEXT_MULTIPLE,
  SUGGESTIONS_GROUPS_TEXT_SINGLE
} from '@/Consts/Suggestions.const'

import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from '@/Types/Group.type'

import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ImageComponent } from '@/Components/System/Image'

import './SuggestionItem.style.scss'

export const SuggestionItemComponent = ({
  suggestion,
  type
}: {
  suggestion: ProfileType | GroupType
  type: typeof SUGGESTION_TYPE_PROFILE | typeof SUGGESTION_TYPE_GROUP
}) => {
  const { uri, picture, name } = suggestion

  const getSuggestionProps = () => {
    let suggestionText

    const suggestionTextProps = {
      [SUGGESTION_TYPE_PROFILE]: {
        counter: 'connectionsInCommon',
        textSingle: SUGGESTIONS_CONNECTIONS_TEXT_SINGLE,
        textMultiple: SUGGESTIONS_CONNECTIONS_TEXT_MULTIPLE,
        textFormat: `:counter :text ${SUGGESTIONS_CONNECTIONS_TEXT_COMMON}`,
        route: ROUTES.PROFILE
      },

      [SUGGESTION_TYPE_GROUP]: {
        counter: 'connectionsAsMembers',
        textSingle: SUGGESTIONS_GROUPS_TEXT_SINGLE,
        textMultiple: SUGGESTIONS_GROUPS_TEXT_MULTIPLE,
        textFormat: `:counter ${SUGGESTIONS_GROUPS_TEXT_COMMON} :text`,
        route: ROUTES.GROUP
      }
    }

    const isSingleConnectionInCommon =
      suggestion[suggestionTextProps[type].counter] === 1

    if (isSingleConnectionInCommon) {
      suggestionText = suggestionTextProps[type].textSingle
    }

    if (!isSingleConnectionInCommon) {
      suggestionText = suggestionTextProps[type].textMultiple
    }

    suggestionText = suggestionTextProps[type].textFormat
      .replace(':counter', suggestion[suggestionTextProps[type].counter])
      .replace(':text', suggestionText)

    return {
      suggestionText,
      linkUri: suggestionTextProps[type].route.path.replace(':id', uri)
    }
  }

  const { suggestionText, linkUri } = getSuggestionProps()

  return (
    <li className="suggestion-item">
      <LinkComponent to={linkUri}>
        <ImageComponent
          src={picture || `/avatar-placeholder.png`}
          alt={name}
          rounded
          square
        />
      </LinkComponent>

      <section>
        <p>
          <LinkComponent to={linkUri}>{name}</LinkComponent>
        </p>

        <TypographyComponent renderAs="span" smallText>
          {suggestionText}
        </TypographyComponent>
      </section>

      <LinkComponent to={linkUri} asButton>
        Visualizar
      </LinkComponent>
    </li>
  )
}
