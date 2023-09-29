import { Theme } from '@/resources/types'
import { MaterialIcon } from './MaterialIcon'
import { styled } from 'styled-components'

const TogglerButton = styled.button`
  width: 40px;
  height: 40px;
  &:hover {
    background-color: rgb(var(--bs-secondary-bg-rgb));
  }
`

export type ThemeTogglerProps = {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <TogglerButton
      onClick={toggleTheme}
      className="mx-2 d-flex align-items-center justify-content-center rounded-pill"
    >
      <div className="rounded-circle text-body-emphasis">
        {theme === 'light' ? (
          <MaterialIcon name="light_mode" />
        ) : (
          <MaterialIcon name="dark_mode" />
        )}
      </div>
    </TogglerButton>
  )
}
