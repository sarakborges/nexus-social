import { ButtonHTMLAttributes } from 'react'

export type ButtonComponentType = {
  primary?: boolean
  transparent?: boolean
  square?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>
