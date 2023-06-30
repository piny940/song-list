import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Theme } from '../resources/types'
import { fromStorage, toStorage } from '@/utils/storage'

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

  const _setTheme = (theme: Theme) => {
    toStorage('theme', theme)
    setTheme(theme)
  }

  const value: ThemeContextInterface = {
    theme,
    setTheme: _setTheme,
  }

  useEffect(() => {
    const defaultTheme = fromStorage('theme') as Theme | undefined
    if (defaultTheme) setTheme(defaultTheme)
  }, [])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { useTheme, ThemeProvider }
