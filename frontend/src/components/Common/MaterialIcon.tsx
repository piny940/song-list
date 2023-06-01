import { RefObject } from 'react'
import { toClass } from '../../utils/helpers'

export interface MaterialIconProps {
  color?: string
  name: string
  className?: string
  refObj?: RefObject<HTMLSpanElement>
  testID?: string
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  color,
  name,
  className = '',
  refObj,
  testID,
}) => {
  return (
    <span
      style={{ color }}
      className={toClass('material-icons', className)}
      ref={refObj}
      data-testid={testID}
    >
      {name}
    </span>
  )
}
