import { NEW_POST_PLACEHOLDER } from '@/Consts/Feed.const'
import { FIELD_TYPE_TEXTAREA } from '@/Consts/FieldTypes.const'

import { CardComponent } from '@/Components/System/Card'
import { FieldComponent } from '@/Components/System/Field'

import './NewPost.style.scss'

export const NewPostComponent = () => (
  <div className="new-post">
    <CardComponent>
      <FieldComponent
        renderAs={FIELD_TYPE_TEXTAREA}
        placeholder={NEW_POST_PLACEHOLDER}
      />
    </CardComponent>
  </div>
)
