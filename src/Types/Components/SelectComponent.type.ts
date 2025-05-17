import { SelectHTMLAttributes } from 'react'

export type SelectComponentType = {
  initialValue?: string
  options: {
    label: string
    value: string
  }[]
} & SelectHTMLAttributes<HTMLSelectElement>
