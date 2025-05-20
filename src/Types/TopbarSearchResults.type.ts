import {
  SUGGESTION_TYPE_GROUP,
  SUGGESTION_TYPE_PROFILE
} from '@/Consts/Suggestions.const'

import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from '@/Types/Group.type'

export type TopbarSearchResultsType = {
  type: typeof SUGGESTION_TYPE_PROFILE | typeof SUGGESTION_TYPE_GROUP
  items: Array<ProfileType | GroupType>
}
