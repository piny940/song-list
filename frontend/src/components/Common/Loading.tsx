import { Spin } from 'react-cssfx-loading'

export const Loading: React.FC = () => {
  return (
    <div className="w-100 d-flex justify-content-center mt-5">
      <Spin color="#1eabe8" width="40px" height="40px" />
    </div>
  )
}
