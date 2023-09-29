import { NoIndex } from '@/components/Common/NoIndex'
import { TestID } from '@/resources/TestID'
import Link from 'next/link'

const Custom500: React.FC = () => {
  return (
    <>
      <NoIndex />
      <div className="container" data-testid={TestID.CUSTOM500}>
        <h1>エラーが発生しました。(400)</h1>
        <p>
          <Link href="/">ホームに戻る</Link>
        </p>
      </div>
    </>
  )
}

export default Custom500
