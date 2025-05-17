import { use, useRef } from 'react'

import { TopbarSearchContext } from '@/Contexts/TopbarSearch.context'

import { TOPBAR_SEARCH_PLACEHOLDER } from '@/Consts/Topbar.const'

import { FieldComponent } from '@/Components/System/Field'
import { DropdownComponent } from '@/Components/System/Dropdown'

import { TopbarSearchResultsComponent } from '@/Components/App/TopbarSearchResults'

import './TopbarSearch.style.scss'

export const TopbarSearchComponent = () => {
  const topbarSearchContext = use(TopbarSearchContext)

  if (!topbarSearchContext) {
    return <></>
  }

  const { setSearchTerm } = topbarSearchContext

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

  return (
    <section className="topbar-search">
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
