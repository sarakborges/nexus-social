import { SettingsType } from '@/Types/Settings.type'

export type SettingsContextType = {
  settings: SettingsType
  setSettings: (newSettings: SettingsType) => void
}
