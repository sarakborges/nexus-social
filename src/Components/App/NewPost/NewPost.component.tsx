import { use } from 'react'
import { FaImage } from 'react-icons/fa'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { FEED_PUBLISH, NEW_POST_ADD_TO_POST } from '@/Consts/Feed.const'
import { NEW_FEED_ITEM } from '@/Forms/NewFeedItem.form'

import { FormComponent } from '@/Components/System/Form'
import { CardComponent } from '@/Components/System/Card'
import { ButtonComponent } from '@/Components/System/Button'
import { TypographyComponent } from '@/Components/System/Typography'

import './NewPost.style.scss'

export const NewPostComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

  return (
    <div className="new-post">
      <CardComponent>
        <FormComponent
          {...NEW_FEED_ITEM}
          hideSubmit
          initialValues={{ 'profile-id': activeProfile?._id }}
        >
          <section className="new-post-actions">
            <section className="new-post-actions-uploads">
              <TypographyComponent>{NEW_POST_ADD_TO_POST}</TypographyComponent>

              <ButtonComponent square transparent>
                <FaImage />
              </ButtonComponent>
            </section>

            <ButtonComponent type="submit">{FEED_PUBLISH}</ButtonComponent>
          </section>
        </FormComponent>
      </CardComponent>
    </div>
  )
}
