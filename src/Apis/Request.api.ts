import axios from 'axios'

import { RequestFiltersType } from '@/Types/RequestFilters.type'

const token = localStorage.getItem('nexus-token')

export const request = axios.create({
  baseURL: `http://localhost:3000`,
  headers: { Authorization: `Bearer ${token}` }
})

export const setFilters = ({
  filters,
  params
}: {
  filters?: RequestFiltersType
  params?: {}
}) => {
  let mappedFilters = ``

  if (!!filters) {
    mappedFilters = Object.keys(filters)
      .map((filterItem) => `_${filterItem}=${String(filters[filterItem])}`)
      .join('&')
  }

  let mappedParams = ``

  if (!!params) {
    mappedParams = Object.keys(params)
      .map((paramItem) => `${paramItem}=${String(params[paramItem])}`)
      .join('&')
  }

  return `?${[mappedParams, mappedFilters].filter(Boolean).join('&')}`
}
