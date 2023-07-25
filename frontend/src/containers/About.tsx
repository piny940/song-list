import Link from 'next/link'

export const About: React.FC = () => {
  return (
    <div className="about">
      <h1>このサイトについて</h1>
      <div className="px-3">
        <p>
          このサイトはファンが非公式に運営しているものです。
          <br />
          <span className="text-danger">
            このサイトに関して配信者様本人へ
            問い合わせをされるのはお控えください。
          </span>
        </p>
        <p>
          セトリはYoutubeのコメント欄を元に作成しています。いつもセトリを作ってくださっている方々に感謝申し上げます。
        </p>
        <p>
          本歌枠データベースは機械によって自動更新されているため、
          しばしば誤った情報が登録されていることがございます。
        </p>
        <p>
          間違いを見つけられた方は
          <Link
            className="text-primary text-decoration-underline"
            href="https://marshmallow-qa.com/piny940?utm_medium=url_text&utm_source=promotion"
            target="_blank"
          >
            マシュマロ
          </Link>
          へ！
        </p>
      </div>
    </div>
  )
}
