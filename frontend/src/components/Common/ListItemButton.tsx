import Link from 'next/link'
import { MouseEventHandler, ReactNode } from 'react'

export type ListItemButtonProps = {
  children: ReactNode
  onClick?: MouseEventHandler
  href?: string
  testID: string
}

export const ListItemButton: React.FC<ListItemButtonProps> = ({
  children,
  onClick,
  testID,
  href,
}) => {
  return href ? (
    <Link
      href={href}
      onClick={onClick}
      data-testid={testID}
      className="list-group-item list-group-item-action"
    >
      {children}
    </Link>
  ) : (
    <div
      className="list-group-item list-group-item-action"
      onClick={onClick}
      data-testid={testID}
    >
      {children}
    </div>
  )
}
