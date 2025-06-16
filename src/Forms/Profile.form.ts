import { FormHTMLAttributes } from 'react'

import * as UsersAPI from '@/Apis/Users'
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

    const links: Array<string> = []
    Object.keys(Object.fromEntries(formData))
      .filter((item) => item.includes('links'))
      .forEach((item) =>
        links.push(Object.fromEntries(formData)[item] as string)
      )

    const formDataEntries = Object.fromEntries(formData) as {
      _id: string
      name: string
      uri: string
      bio: string
      picture: string
    }

    const { _id, name, uri, bio, picture } = formDataEntries

    if (![name, uri].every(Boolean)) {
      const response = {
        errorMessage: `Preencha todos os campos obrigatórios.`,

        errors: {
          name: !name ? `Campo obrigatório` : ``,
          uri: !uri ? `Campo obrigatório` : ``
        }
      }

      return response
    }

    if (!!_id) {
      const updateProfileResponse = await ProfilesAPI.updateProfile({
        _id,
        name,
        uri,
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
        redirectUri: ROUTES.HOME.path,
        reloadUser: true
      }

      return response
    } else {
      const userId = localStorage.getItem('user-id')
        ? localStorage.getItem('user-id')
        : undefined

      if (!userId) {
        const response = {
          errorMessage: `Falha ao enviar. Verifique se você está logado e tente novamente.`
        }

        return response
      }

      const createProfileResponse = await ProfilesAPI.createProfile({
        name,
        uri,
        bio,
        picture,
        userId,
        links
      })

      if (!createProfileResponse) {
        const response = {
          errorMessage: `Falha ao eviar. Verifique as informações inseridas e tente novamente.`
        }

        return response
      }

      const updateUserProfilesResponse = await UsersAPI.addProfileToUser({
        userId,
        profile: createProfileResponse._id
      })

      if (!updateUserProfilesResponse) {
        const response = {
          errorMessage: `Falha ao enviar. Verifique as informações inseridas e tente novamente.`
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
