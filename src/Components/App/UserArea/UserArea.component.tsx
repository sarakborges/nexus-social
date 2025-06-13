import { use, useRef } from 'react'
import { FaCog } from 'react-icons/fa'

import { ActiveProfileContext } from '@/Contexts/ActiveProfile.context'

import { ROUTES } from '@/Consts/Routes.const'
import {
  USER_AREA_SELECT_PROFILE_CTA,
  USER_AREA_WELCOME
} from '@/Consts/UserArea.const'

import { ImageComponent } from '@/Components/System/Image'
import { TypographyComponent } from '@/Components/System/Typography'
import { LinkComponent } from '@/Components/System/Link'
import { ButtonComponent } from '@/Components/System/Button'
import { DropdownComponent } from '@/Components/System/Dropdown'
import { CardComponent } from '@/Components/System/Card'

import { UserAreaDropdownComponent } from '@/Components/App/UserAreaDropdown'

import './UserArea.style.scss'

export const UserAreaComponent = () => {
  const { activeProfile } = use(ActiveProfileContext)

  const userAreaDropdownRef = useRef<{
    toggleDropdown: (e: MouseEvent | React.MouseEvent) => void
  } | null>(null)

  const toggleDropdown = (e) => {
    if (!userAreaDropdownRef?.current) {
      return
    }

    userAreaDropdownRef?.current?.toggleDropdown(e)
  }

  return (
    <section className="user-area">
      <CardComponent>
        <ButtonComponent onClick={toggleDropdown} transparent>
          <ImageComponent
            src={activeProfile?.picture || `/avatar-placeholder.png`}
            alt={activeProfile?.name}
            rounded
            square
          />

          <section>
            {!!activeProfile?._id && (
              <>
                <TypographyComponent renderAs="p">
                  {activeProfile?.name}
                </TypographyComponent>

                <TypographyComponent smallText renderAs="p">
                  {`@${activeProfile?.uri}`}
                </TypographyComponent>
              </>
            )}

            {!activeProfile?._id && (
              <>
                <TypographyComponent renderAs="p">
                  {USER_AREA_WELCOME}
                </TypographyComponent>

                <TypographyComponent smallText renderAs="p">
                  {USER_AREA_SELECT_PROFILE_CTA}
                </TypographyComponent>
              </>
            )}
          </section>
        </ButtonComponent>

        <LinkComponent to={ROUTES.HOME.path} asButton>
          <FaCog />
        </LinkComponent>

        <DropdownComponent ref={userAreaDropdownRef}>
          <UserAreaDropdownComponent closeParentDropdown={toggleDropdown} />
        </DropdownComponent>
      </CardComponent>
    </section>
  )
}
