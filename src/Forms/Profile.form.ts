import { FormHTMLAttributes } from 'react'

import * as ProfilesAPI from '@/Apis/Profiles'

import { FormType } from '@/Types/Form.type'

import { FIELD_TYPE_TEXT, FIELD_TYPE_TEXTAREA } from '@/Consts/FieldTypes.const'
import {
  REGISTER_BIO_LABEL,
  REGISTER_BIO_PLACEHOLDER,
  REGISTER_NAME_PLACEHOLDER,
  REGISTER_URI_LABEL,
  REGISTER_URI_PLACEHOLDER
} from '@/Consts/Register.const'
import { ROUTES } from '@/Consts/Routes.const'
import { PROFILE_FORM_BUTTON } from '@/Consts/ProfileForm.const'

export const PROFILE_FORM: FormType & FormHTMLAttributes<HTMLFormElement> = {
  submitText: PROFILE_FORM_BUTTON,

  onSubmit: async (e) => {
    const formData = new FormData(e.target as HTMLFormElement)

    const linkLabels: Array<string> = []
    Object.keys(Object.fromEntries(formData))
      .filter((item) => item.includes('links-label'))
      .forEach((item) =>
        linkLabels.push(Object.fromEntries(formData)[item] as string)
      )

    const linkUris: Array<string> = []
    Object.keys(Object.fromEntries(formData))
      .filter((item) => item.includes('links-uri'))
      .forEach((item) =>
        linkUris.push(Object.fromEntries(formData)[item] as string)
      )

    const links = linkLabels.map((_, linkIndex) => ({
      label: linkLabels[linkIndex],
      uri: linkUris[linkIndex]
    }))

    const formDataEntries = Object.fromEntries(formData) as {
      _id: string
      name: string
      uri: string
      bio: string
      picture: string
    }

    const { _id, name, uri, bio, picture } = formDataEntries

    const cleanUri = uri
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^\w\s.-]/g, '')
      .replace(/[\s\u00A0\u200B\u202F]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    if (![name, cleanUri].every(Boolean)) {
      const response = {
        errorMessage: `Preencha todos os campos obrigatórios.`,

        errors: {
          name: !name ? `Campo obrigatório` : ``,
          uri: !cleanUri ? `Campo obrigatório` : ``
        }
      }

      return response
    }

    if (!!_id) {
      const updateProfileResponse = await ProfilesAPI.updateProfile({
        name,
        uri: cleanUri,
        bio,
        picture,
        links
      })

      if (!updateProfileResponse) {
        const response = {
          errorMessage: `Falha ao eviar. Verifique as informações inseridas e tente novamente.`
        }

        return response
      }

      const response = {
        redirectUri: ROUTES.PROFILE.path.replace(':uri', cleanUri),
        reloadUser: true
      }

      return response
    } else {
      const createProfileResponse = await ProfilesAPI.createProfile({
        name,
        uri: cleanUri,
        bio,
        picture,
        links
      })

      if (!createProfileResponse) {
        const response = {
          errorMessage: `Falha ao eviar. Verifique as informações inseridas e tente novamente.`
        }

        return response
      }

      const response = {
        redirectUri: ROUTES.HOME.path,
        reloadUser: true
      }

      return response
    }
  },

  sections: [
    {
      id: 'profile',
      title: 'Informações básicas',
      fields: [
        {
          name: '_id',
          hidden: true
        },

        {
          name: 'name',
          label: REGISTER_NAME_PLACEHOLDER,
          placeholder: REGISTER_NAME_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'uri',
          label: REGISTER_URI_LABEL,
          placeholder: REGISTER_URI_PLACEHOLDER,
          type: FIELD_TYPE_TEXT
        },

        {
          name: 'picture',
          hidden: true
        },

        {
          name: 'bio',
          label: REGISTER_BIO_LABEL,
          placeholder: REGISTER_BIO_PLACEHOLDER,
          renderAs: FIELD_TYPE_TEXTAREA
        }
      ]
    }
  ]
}
