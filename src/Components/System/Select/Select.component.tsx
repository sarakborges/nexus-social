import { SelectComponentType } from '@/Types/Components/SelectComponent.type'

import './Select.style.scss'

export const SelectComponent = ({ options, ...rest }: SelectComponentType) => {
  return (
    <select id={rest.name} className="field" {...rest}>
      {options?.map((optionItem) => (
        <option key={optionItem.value} value={optionItem.value}>
          {optionItem.label}
        </option>
      ))}
    </select>
  )
}
