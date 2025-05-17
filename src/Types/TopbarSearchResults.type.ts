import { ProfileType } from '@/Types/Profile.type'
import { GroupType } from '@/Types/Group.type'

export type TopbarSearchResultsType = {
  type: 'group' | 'profile'
  items: Array<ProfileType | GroupType>
}
