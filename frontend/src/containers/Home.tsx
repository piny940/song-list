import Link from 'next/link'

export const Home: React.FC = () => {
  return (
    <div className="">
      <h1>歌枠データベース</h1>
      <div className="list-group">
        <Link
          href="/channels"
          className="list-group-item list-group-item-action"
        >
          チャンネルから検索
        </Link>
      </div>
    </div>
  )
}
