import { MouseEventHandler, ReactNode } from 'react'

export type ListItemButton = {
  children: ReactNode
  onClick: MouseEventHandler
}

export const LinkListActionButton: React.FC<ListItemButton> = ({
  children,
  onClick,
}) => {
  return (
    <div className="list-group-item list-group-item-action" onClick={onClick}>
      {children}
    </div>
  )
}
