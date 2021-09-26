import { KeyboardEventHandler } from './KeyboardEventHandler'
import { MouseEventHandler } from './MouseEventHandler'
import { Piano } from './Piano/Layout'

export const App: React.FC = () => {
  return (
    <div className="h-screen bg-black">
      <div className="container mx-auto p-12 bg-white">
        <KeyboardEventHandler />
        <MouseEventHandler />
        <Piano />
      </div>
    </div>
  )
}
