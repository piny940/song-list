import { UserType } from '@/resources/types'
import { getData } from '@/utils/api'
import Link from 'next/link'
import { styled } from 'styled-components'
import useSWR from 'swr'

const FooterTag = styled.footer`
  margin-top: 20px;
  position: sticky;
  top: 100vh;
`

export const Footer: React.FC = () => {
  const { data } = useSWR<{ user: UserType }>('/user', getData)

  return (
    <FooterTag className="footer text-center bg-secondary text-white p-4">
      <Link href="/maintenance" className="text-white">
        {!!data && !!data.user ? 'メンテナンスする' : 'メンテナンスに参加する'}
      </Link>
      <br />
      <small>&copy;2023 piny940</small>
    </FooterTag>
  )
}
