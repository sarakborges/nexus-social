import { MdEdit } from 'react-icons/md'
import { HiCog6Tooth } from 'react-icons/hi2'
import { BiLogOut } from 'react-icons/bi'

import { ROUTES } from './Routes.const'

export const TOPBAR_MENU = [
  {
    text: `Editar perfil`,
    icon: <MdEdit />,
    to: ROUTES.HOME.path
  },

  {
    text: `Configurações da conta`,
    icon: <HiCog6Tooth />,
    to: ROUTES.HOME.path
  },

  {
    text: `Sair`,
    icon: <BiLogOut />,
    to: ROUTES.LOGIN.path
  }
]

export const TOPBAR_SEARCH_PLACEHOLDER = `O que você procura?`
export const TOPBAR_SEARCH_RESULTS_TITLES = {
  profile: `Perfis encontrados`,
  group: `Grupos encontrados`
}
