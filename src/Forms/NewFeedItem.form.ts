import { FormHTMLAttributes } from 'react'

import * as FeedAPI from '@/Apis/Feed'

import { FormType } from '@/Types/Form.type'

import { FIELD_TYPE_TEXTAREA } from '@/Consts/FieldTypes.const'
import { FEED_PUBLISH, NEW_POST_PLACEHOLDER } from '@/Consts/Feed.const'

export const NEW_FEED_ITEM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: FEED_PUBLISH,

  onSubmit: async (e) => {
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const submitButton = form.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement

    const { content, 'profile-id': profileId } = Object.fromEntries(
      formData
    ) as {
      content: string
      'profile-id': string
    }

    submitButton.disabled = true
    const publishResponse = await FeedAPI.createNewFeedItem({
      content,
      profileId
    })
    submitButton.disabled = false

    if (!publishResponse) {
      const response = {
        errorMessage: `Falha ao publicar.`
      }

      return response
    }

    const response = {
      insertedFeed: { ...publishResponse }
    }

    form.reset()

    return response
  },

  sections: [
    {
      id: 'new-post',
      fields: [
        {
          name: 'content',
          placeholder: NEW_POST_PLACEHOLDER,
          renderAs: FIELD_TYPE_TEXTAREA
        },

        {
          name: 'profile-id',
          hidden: true
        }
      ]
    }
  ]
}
