import { NoIndex } from '@/components/Common/NoIndex'
import { TestID } from '@/resources/TestID'
import Link from 'next/link'

const Custom404: React.FC = () => {
  return (
    <>
      <NoIndex />
      <div className="container" data-testid={TestID.CUSTOM404}>
        <h1>ページが見つかりませんでした。(404)</h1>
        <p>
          <Link href="/">ホームに戻る</Link>
        </p>
      </div>
    </>
  )
}

export default Custom404
