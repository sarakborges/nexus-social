import { createContext, useState } from 'react'

import { SettingsType } from '@/Types/Settings.type'
import { SettingsContextType } from '@/Types/Contexts/SettingsContext.type'

const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType
)

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState<SettingsType>({
    theme: 'default',
    language: 'pt-br'
  })

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider, SettingsContext }
