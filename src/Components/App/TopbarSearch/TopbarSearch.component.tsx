import { FieldComponent } from '@/Components/System/Field'

import './TopbarSearch.style.scss'

export const TopbarSearchComponent = () => (
  <section className="topbar-search">
    <FieldComponent placeholder="O que você procura?" />
  </section>
)
