import {
  SUGGESTION_TYPE_GROUP,
  SUGGESTION_TYPE_PROFILE
} from '@/Consts/Suggestions.const'

import { GroupType } from './Group.type'
import { ProfileType } from './Profile.type'

export type SuggestionType = {
  list: ProfileType[] | GroupType[]
  type: typeof SUGGESTION_TYPE_PROFILE | typeof SUGGESTION_TYPE_GROUP
}
