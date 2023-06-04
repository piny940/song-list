import { TestID } from '@/resources/TestID'
import Link from 'next/link'

export const Home: React.FC = () => {
  return (
    <div className="" data-testid={TestID.HOME}>
      <h1>歌枠データベース</h1>
      <div className="list-group">
        <Link
          href="/channel"
          className="list-group-item list-group-item-action"
        >
          チャンネルから検索
        </Link>
      </div>
    </div>
  )
}
