import { createContext, ReactNode, useContext, useState } from 'react'
import { Theme } from '../resources/types'

interface ThemeContextInterface {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const defaultThemeState: ThemeContextInterface = {
  theme: 'light',
  setTheme: (theme: Theme) => undefined,
}

const ThemeContext = createContext(defaultThemeState)

const useTheme = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light')

  const value: ThemeContextInterface = {
    theme,
    setTheme: setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { useTheme, ThemeProvider }
