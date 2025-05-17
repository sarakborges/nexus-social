import {
  FEED_PUBLISH,
  NEW_POST_ADD_TO_POST,
  NEW_POST_PLACEHOLDER
} from '@/Consts/Feed.const'
import { FIELD_TYPE_TEXTAREA } from '@/Consts/FieldTypes.const'

import { CardComponent } from '@/Components/System/Card'
import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'

import './NewPost.style.scss'
import { FaImage } from 'react-icons/fa'
import { TypographyComponent } from '@/Components/System/Typography'

export const NewPostComponent = () => (
  <div className="new-post">
    <CardComponent>
      <FieldComponent
        renderAs={FIELD_TYPE_TEXTAREA}
        placeholder={NEW_POST_PLACEHOLDER}
      />

      <section className="new-post-actions">
        <section className="new-post-actions-uploads">
          <TypographyComponent>{NEW_POST_ADD_TO_POST}</TypographyComponent>

          <ButtonComponent square transparent>
            <FaImage />
          </ButtonComponent>
        </section>

        <ButtonComponent>{FEED_PUBLISH}</ButtonComponent>
      </section>
    </CardComponent>
  </div>
)
