import { ButtonHTMLAttributes } from 'react'

export type ButtonComponentType = {
  primary?: boolean
  cancel?: boolean
  transparent?: boolean
  active?: boolean
  square?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
