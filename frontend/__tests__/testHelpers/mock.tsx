import React from 'react'

export type TestComponentProps = {
  testID: string
}

export const TestComponent: React.FC<TestComponentProps> = ({ testID }) => {
  return <div data-testid={testID}>Test</div>
}
