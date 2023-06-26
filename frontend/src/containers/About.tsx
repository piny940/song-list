import Link from 'next/link'

export const About: React.FC = () => {
  return (
    <div className="about">
      <h1>お問い合わせ</h1>
      <div className="container">
        <p>
          お問い合わせは
          <Link
            className="text-primary text-decoration-underline"
            href="https://twitter.com/An__twit"
            target="_blank"
          >
            みかん
          </Link>
          まで
        </p>
        <p className="text-danger">
          このサイトはファンが非公式に運営しているものです。
          <br />
          このサイトに関して配信者様本人へ
          問い合わせをされるのはお控えください。
        </p>
      </div>
    </div>
  )
}
