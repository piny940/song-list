import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { Video, VideoProps } from '@/components/SongLists/Video'
import { Mock } from 'ts-mockery'
import { Video as VideoType } from '@/resources/types'
import { TestID } from '@/resources/TestID'

describe('<Video />', () => {
  const props = Mock.from<VideoProps>({
    video: Mock.from<VideoType>({
      id: 1001,
      title: 'TestVideo',
    }),
  })
  it('正常に描画される', async () => {
    const { getByTestId, getByText } = render(<Video {...props} />)

    await waitFor(() => {
      expect(getByTestId(TestID.VIDEO)).toBeTruthy()
      expect(getByText('TestVideo')).toBeTruthy()
    })
  })
})
