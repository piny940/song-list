import { MaterialIcon } from './MaterialIcon'
import { styled } from 'styled-components'

const TogglerDiv = styled.div`
  height: 40px;
  &:hover {
    background-color: rgb(var(--bs-secondary-bg-rgb));
  }
`

const TogglerA = styled.a`
  width: 40px;
  height: 40px;
  padding: 8px;
  display: block;
`

export type ThemeTogglerProps = {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <TogglerDiv
      role="button"
      onClick={toggleTheme}
      className="d-flex align-items-center rounded-pill"
    >
      <TogglerA className="rounded-circle text-body-emphasis">
        {theme === 'light' ? (
          <MaterialIcon name="light_mode" />
        ) : (
          <MaterialIcon name="dark_mode" />
        )}
      </TogglerA>
    </TogglerDiv>
  )
}
