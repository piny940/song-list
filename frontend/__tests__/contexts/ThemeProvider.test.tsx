import { ThemeProvider, useTheme } from '@/context/ThemeProvider'
import { ReactNode } from 'react'
import { renderHook, waitFor, act } from '@testing-library/react'

describe('<ThemeProvider />', () => {
  it('正常にテーマを取得できる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <ThemeProvider>{children}</ThemeProvider>
    }
    const { result } = renderHook(() => useTheme(), { wrapper: wrapper })

    await waitFor(() => {
      expect(result.current.theme).toBe('light')
    })
  })
  it('正常にテーマを更新できる', async () => {
    const wrapper = ({ children }: { children: ReactNode }) => {
      return <ThemeProvider>{children}</ThemeProvider>
    }
    const { result } = renderHook(() => useTheme(), { wrapper: wrapper })

    act(() => {
      result.current.setTheme('dark')
    })
    await waitFor(() => {
      expect(result.current.theme).toBe('dark')
    })
  })
})
