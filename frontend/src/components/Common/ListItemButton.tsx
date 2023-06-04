import { MouseEventHandler, ReactNode } from 'react'

export type ListItemButtonProps = {
  children: ReactNode
  onClick: MouseEventHandler
  testID: string
}

export const ListItemButton: React.FC<ListItemButtonProps> = ({
  children,
  onClick,
  testID,
}) => {
  return (
    <div
      className="list-group-item list-group-item-action"
      onClick={onClick}
      data-testid={testID}
    >
      {children}
    </div>
  )
}
