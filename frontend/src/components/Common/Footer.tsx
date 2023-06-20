import Link from 'next/link'
import { styled } from 'styled-components'

const FooterTag = styled.footer`
  margin-top: 20px;
  position: sticky;
  top: 100vh;
`

export const Footer: React.FC = () => {
  return (
    <FooterTag className="footer text-center bg-secondary text-white p-4">
      <Link href="/maintenance" className="text-white">
        メンテナンスする
      </Link>
      <br />
      <small>&copy;2023 piny940</small>
    </FooterTag>
  )
}
