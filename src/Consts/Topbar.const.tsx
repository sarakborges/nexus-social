import { HiCog6Tooth } from 'react-icons/hi2'
import { BiLogOut } from 'react-icons/bi'

import { ROUTES } from './Routes.const'

export const TOPBAR_MENU = [
  {
    text: `Configurações da conta`,
    icon: <HiCog6Tooth />,
    to: ROUTES.HOME.path
  },

  {
    text: `Sair`,
    icon: <BiLogOut />,
    to: ROUTES.LOGIN.path,
    onClick: () => {
      localStorage.removeItem('userId')
      localStorage.removeItem('nexus-token')
    }
  }
]

export const TOPBAR_SEARCH_PLACEHOLDER = `O que você procura?`
export const TOPBAR_SEARCH_RESULTS_TITLES = {
  profile: `Perfis encontrados`,
  group: `Grupos encontrados`
}
export const TOPBAR_SEARCH_NO_RESULTS = `Nenhum resultado encontrado.`
