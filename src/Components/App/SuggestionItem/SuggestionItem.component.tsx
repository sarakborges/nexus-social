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

  const getConnectionsInCommonText = () => {
    let connectionsInCommonCountText = ``

    if (type !== SUGGESTION_TYPE_PROFILE) {
      return connectionsInCommonCountText
    }

    const { connectionsInCommon } = suggestion as ProfileType

    const isSingleConnectionInCommon = connectionsInCommon === 1

    if (isSingleConnectionInCommon) {
      connectionsInCommonCountText = SUGGESTIONS_CONNECTIONS_TEXT_SINGLE
    }

    if (!isSingleConnectionInCommon) {
      connectionsInCommonCountText = SUGGESTIONS_CONNECTIONS_TEXT_MULTIPLE
    }

    return `${connectionsInCommon} ${connectionsInCommonCountText} ${SUGGESTIONS_CONNECTIONS_TEXT_COMMON}`
  }

  const getConnectionsAsMembersText = () => {
    let connectionsAsMembersCountText = ``

    if (type !== SUGGESTION_TYPE_GROUP) {
      return connectionsAsMembersCountText
    }

    const { connectionsAsMembers } = suggestion as GroupType

    const isSingleConnectionAsMember = connectionsAsMembers === 1

    if (isSingleConnectionAsMember) {
      connectionsAsMembersCountText = SUGGESTIONS_GROUPS_TEXT_SINGLE
    }

    if (!isSingleConnectionAsMember) {
      connectionsAsMembersCountText = SUGGESTIONS_GROUPS_TEXT_MULTIPLE
    }

    return `${connectionsAsMembers} ${SUGGESTIONS_GROUPS_TEXT_COMMON} ${connectionsAsMembersCountText}`
  }

  const getLinkUri = () => {
    let linkUri = ``

    if (type === SUGGESTION_TYPE_PROFILE) {
      linkUri = ROUTES.PROFILE.path.replace(':id', uri)
    }

    if (type === SUGGESTION_TYPE_GROUP) {
      linkUri = ROUTES.GROUP.path.replace(':id', uri)
    }

    return linkUri
  }

  const connectionsInCommonText = getConnectionsInCommonText()
  const connectionsAsMembersText = getConnectionsAsMembersText()
  const linkUri = getLinkUri()

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

        {type === SUGGESTION_TYPE_PROFILE && (
          <TypographyComponent renderAs="span" smallText>
            {connectionsInCommonText}
          </TypographyComponent>
        )}

        {type === SUGGESTION_TYPE_GROUP && (
          <TypographyComponent renderAs="span" smallText>
            {connectionsAsMembersText}
          </TypographyComponent>
        )}
      </section>

      <LinkComponent to={linkUri} asButton>
        Visualizar
      </LinkComponent>
    </li>
  )
}
