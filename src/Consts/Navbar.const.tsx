import { FaHome, FaUserCircle } from 'react-icons/fa'
import { BiSolidEnvelope } from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { FaPeopleGroup } from 'react-icons/fa6'

import { ROUTES } from './Routes.const'

export const NAVBAR = [
  {
    id: ROUTES.HOME.id,
    to: ROUTES.HOME.path,
    text: `Home`,
    icon: <FaHome />
  },

  {
    id: ROUTES.PROFILE.id,
    to: ROUTES.PROFILE.path,
    text: `Perfil`,
    icon: <FaUserCircle />
  },

  {
    id: ROUTES.MESSAGES.id,
    to: ROUTES.MESSAGES.path,
    text: `Mensagens`,
    icon: <BiSolidEnvelope />
  },

  {
    id: ROUTES.PROFILE_CONNECTIONS.id,
    to: ROUTES.PROFILE_CONNECTIONS.path,
    text: `Conexões`,
    icon: <BsPeopleFill />
  },

  {
    id: ROUTES.PROFILE_GROUPS.id,
    to: ROUTES.PROFILE_GROUPS.path,
    text: `Grupos`,
    icon: <FaPeopleGroup />
  }
]
