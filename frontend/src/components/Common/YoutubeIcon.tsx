import Link from 'next/link'
import { styled } from 'styled-components'

const YoutubeIconSpan = styled.span`
  width: 22px;
  height: 22px;
  background-image: url('/images/youtube.svg');
  background-size: contain;
  display: inline-block;

  &:hover {
    background-image: url('/images/youtube-red.svg');
  }
`

export type YoutubeIconProps = {
  link: string
}

export const YoutubeIcon: React.FC<YoutubeIconProps> = ({ link }) => {
  return (
    <Link href={link}>
      <YoutubeIconSpan role="button" />
    </Link>
  )
}
