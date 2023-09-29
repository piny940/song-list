import { MouseEventHandler } from 'react'
import styles from '../../styles/common.module.scss'
import { styled } from 'styled-components'

const DetailButton = styled.button`
  --text-color: var(--bs-body-color);
  &:hover {
    --text-color: var(--bs-link-color);
  }
`

const Triangle = styled.div`
  border-left: 10px solid var(--text-color);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
`

export type ContentOpenerProps = {
  onClick: MouseEventHandler
  contentOpen: boolean
  testID?: string
  label: string
}

export const ContentOpener: React.FC<ContentOpenerProps> = ({
  onClick,
  contentOpen,
  testID,
  label,
}) => {
  return (
    <DetailButton className="small me-4" onClick={onClick} data-testid={testID}>
      <Triangle
        className={`${styles.animateFast} ${
          contentOpen ? styles.rotate90 : ''
        } d-inline-block`}
      ></Triangle>
      <span className="ms-1">{label}</span>
    </DetailButton>
  )
}
