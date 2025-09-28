import { MaintenanceHome } from '@/containers/Maintenance/Home'
import { render, waitFor } from '@testing-library/react'

jest.mock('@/components/SongLists/Channels')
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('<MaintenanceHome />', () => {
  it('MaintenanceHomeが正常に描画される', async () => {
    const component = render(<MaintenanceHome />)

    await waitFor(() => {
      expect(component).toBeTruthy()
    })
  })
})
