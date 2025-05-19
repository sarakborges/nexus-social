import { use, useRef } from 'react'

import { TopbarSearchContext } from '@/Contexts/TopbarSearch.context'

import { TOPBAR_SEARCH_PLACEHOLDER } from '@/Consts/Topbar.const'
import { FIELD_TYPE_SELECT } from '@/Consts/FieldTypes.const'

import { FieldComponent } from '@/Components/System/Field'
import { DropdownComponent } from '@/Components/System/Dropdown'

import { TopbarSearchResultsComponent } from '@/Components/App/TopbarSearchResults'

import './TopbarSearch.style.scss'

export const TopbarSearchComponent = () => {
  const { setSearchTerm, setAllowedTypes } = use(TopbarSearchContext)

  const topbarMenuDropdownRef = useRef<{
    openDropdown: (e: MouseEvent | React.MouseEvent) => void
    closeDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const updateSearch = (e) => {
    const val = e.target.value.trim().toLocaleLowerCase()

    setSearchTerm(val)

    if (!val) {
      topbarMenuDropdownRef?.current?.closeDropdown(e)
      return
    }

    topbarMenuDropdownRef?.current?.openDropdown(e)
  }

  const openDropdown = (e) => {
    if (!topbarMenuDropdownRef?.current) {
      return
    }

    if (!e.target.value) {
      topbarMenuDropdownRef?.current?.closeDropdown(e)
      return
    }

    topbarMenuDropdownRef?.current?.openDropdown(e)
  }

  const closeDropdown = (e) => {
    if (!topbarMenuDropdownRef?.current) {
      return
    }

    topbarMenuDropdownRef?.current?.closeDropdown(e)
  }

  const updateAllowedTypes = (e) => {
    setAllowedTypes(e.target.value)
  }

  return (
    <section className="topbar-search">
      <div>
        <FieldComponent
          renderAs={FIELD_TYPE_SELECT}
          initialValue="all"
          onChange={updateAllowedTypes}
          options={[
            {
              label: 'Tudo',
              value: 'all'
            },

            {
              label: 'Perfis',
              value: 'profile'
            },

            {
              label: 'Grupos',
              value: 'group'
            }
          ]}
        />
      </div>

      <FieldComponent
        placeholder={TOPBAR_SEARCH_PLACEHOLDER}
        onFocus={openDropdown}
        onChange={updateSearch}
        onBlur={closeDropdown}
      />

      <DropdownComponent ref={topbarMenuDropdownRef}>
        <TopbarSearchResultsComponent />
      </DropdownComponent>
    </section>
  )
}
