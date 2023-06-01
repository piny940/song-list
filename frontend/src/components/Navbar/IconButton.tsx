import { useTheme } from '@/context/ThemeProvider'
import { TestID } from '@/resources/TestID'
import { Theme } from '@/resources/types'
import Image from 'next/image'
import { MouseEventHandler } from 'react'

export type IconButtonProps = {
  onClick: MouseEventHandler
  size?: number
  theme: Theme
}

export const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  size = 35,
}) => {
  const { theme } = useTheme()

  const src =
    theme === 'light'
      ? '/images/default_account_icon_black.png'
      : '/images/default_account_icon_white.png'
  return (
    <button type="button" onClick={onClick} data-testid={TestID.PROFILE_BUTTON}>
      <Image width={size} height={size} src={src} alt="profile icon" />
    </button>
  )
}
