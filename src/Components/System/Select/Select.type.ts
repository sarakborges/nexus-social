import { SelectHTMLAttributes } from 'react'

export type SelectComponentType = {
  options?: {
    label: string
    value: string
  }[]
} & SelectHTMLAttributes<HTMLSelectElement>
