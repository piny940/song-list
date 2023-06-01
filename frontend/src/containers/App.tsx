import { TestID } from '@/resources/TestID'

export const App: React.FC = () => {
  return (
    <div id="app" data-testid={TestID.APP}>
      <h1>Next template</h1>
      <p>This is a template repository of next project.</p>
    </div>
  )
}
