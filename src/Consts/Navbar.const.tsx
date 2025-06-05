import { FaHome, FaUserCircle } from 'react-icons/fa'
import { BiSolidEnvelope } from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { FaPeopleGroup } from 'react-icons/fa6'

import { ROUTES } from './Routes.const'

import { NavbarNotificationsComponent } from '@/Components/App/NavbarNotifications'

export const NAVBAR_USER_WELCOME = `Bem vindo ao Nexus!`
export const NAVBAR_USER_SELECT_PROFILE_TO_START = `Selecione um perfil para começar a interagir!`
export const NAVBAR_USER_CREATE_PROFILE_TO_START = `Crie um perfil para começar a interagir!`
export const NAVBAR_USER_EDIT_PROFILE = `Editar perfil`
export const NAVBAR_USER_SELECT_PROFILE = `Selecionar perfil`
export const NAVBAR_USER_DELETE_PROFILE = `Deletar perfil`

export const NAVBAR = [
  {
    id: ROUTES.HOME.id,
    to: ROUTES.HOME.path,
    text: `Home`,
    icon: <FaHome />
  },

  {
    id: `notifications`,
    component: <NavbarNotificationsComponent />,
    needsActiveProfile: true
  },

  {
    id: ROUTES.PROFILE.id,
    to: ROUTES.PROFILE.path,
    text: `Perfil`,
    icon: <FaUserCircle />,
    needsActiveProfile: true
  },

  {
    id: ROUTES.MESSAGES.id,
    to: ROUTES.MESSAGES.path,
    text: `Mensagens`,
    icon: <BiSolidEnvelope />,
    needsActiveProfile: true
  },

  {
    id: ROUTES.PROFILE_CONNECTIONS.id,
    to: ROUTES.PROFILE_CONNECTIONS.path,
    text: `Conexões`,
    icon: <BsPeopleFill />,
    needsActiveProfile: true
  },

  {
    id: ROUTES.PROFILE_GROUPS.id,
    to: ROUTES.PROFILE_GROUPS.path,
    text: `Grupos`,
    icon: <FaPeopleGroup />,
    needsActiveProfile: true
  }
]
