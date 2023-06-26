import { render, waitFor } from '@testing-library/react'
import { expect } from '@jest/globals'
import { YoutubeIcon, YoutubeIconProps } from '@/components/Common/YoutubeIcon'
import { Mock } from 'ts-mockery'

jest.mock('next/link')

describe('<YoutubeIcon />', () => {
  it('正常に描画される', async () => {
    const props = Mock.all<YoutubeIconProps>()
    const component = render(<YoutubeIcon {...props} />)
    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
