import { use, useEffect, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { TypographyComponent } from '@/Components/System/Typography'
import { FieldComponent } from '@/Components/System/Field'
import { ButtonComponent } from '@/Components/System/Button'

import './ProfileFormLinks.style.scss'

export const ProfileFormLinksComponent = ({ isEdit }: { isEdit?: boolean }) => {
  const { activeProfile } = use(ActiveProfileContext)
  const [links, setLinks] = useState<Array<number>>([])

  const addNewLink = () => {
    const [lastLink] = [...links].reverse()
    setLinks(!!links.length ? [...links, lastLink + 1] : [0])
  }

  const removeLink = (index: number) => {
    setLinks([...links].filter((item) => item !== index))
  }

  useEffect(() => {
    if (!isEdit || !activeProfile?._id || !activeProfile?.links?.length) {
      if (!!links?.length) {
        setLinks([])
      }

      return
    }

    setLinks([...(activeProfile?.links).map((_, index) => index)])
  }, [activeProfile?._id])

  return (
    <section className="profile-form-links">
      <ul>
        {links.map((linkItem) => (
          <li key={`links-${activeProfile?._id}-${linkItem}`}>
            <FieldComponent
              name={`links-label[${linkItem}]`}
              label="Texto do link"
              placeholder="Texto do link"
              defaultValue={activeProfile?.links?.[linkItem]?.label}
            />

            <FieldComponent
              name={`links-uri[${linkItem}]`}
              label="URL do link"
              placeholder="http://seulinkaqui"
              defaultValue={activeProfile?.links?.[linkItem]?.uri}
            />

            <ButtonComponent square cancel onClick={() => removeLink(linkItem)}>
              <FaTimes />
            </ButtonComponent>
          </li>
        ))}
      </ul>

      <footer>
        <ButtonComponent square onClick={addNewLink}>
          <FaPlus />
        </ButtonComponent>
      </footer>
    </section>
  )
}
