import { MaintenanceHome } from '@/containers/Maintenance/Home'
import { TestID } from '@/resources/TestID'
import { render, waitFor } from '@testing-library/react'

jest.mock('@/components/SongLists/Channels')
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('<MaintenanceHome />', () => {
  it('MaintenanceHomeが正常に描画される', async () => {
    const { getByTestId } = render(<MaintenanceHome />)

    await waitFor(() => {
      expect(getByTestId(TestID.MAINTENANCE_HOME)).toBeTruthy()
    })
  })
})
