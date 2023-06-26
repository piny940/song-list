import { styled } from 'styled-components'

const YoutubeIconSpan = styled.span`
  width: 22px;
  height: 22px;
  background-image: url('/images/twitter.svg');
  background-size: contain;
  display: inline-block;

  &:hover {
    background-image: url('/images/twitter-blue.svg');
  }
`

export const TwitterIcon: React.FC = () => {
  return <YoutubeIconSpan role="button" />
}
