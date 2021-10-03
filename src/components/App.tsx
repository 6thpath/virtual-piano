import { KeyboardEventHandler } from './KeyboardEventHandler'
import { MouseEventHandler } from './MouseEventHandler'
import { WindowDimensionsHandler } from './WindowDimensionsHandler'
import { Piano } from './Piano/Layout'

export const App: React.FC = () => {
  return (
    <>
      <WindowDimensionsHandler />
      <KeyboardEventHandler />
      <MouseEventHandler />

      <div className="container mx-auto p-12 font-dosis bg-white">
        <Piano />
      </div>
    </>
  )
}
