import { KeyboardEventHandler } from './KeyboardEventHandler'
import { MouseEventHandler } from './MouseEventHandler'
import { WindowDimensionsHandler } from './WindowDimensionsHandler'
import { Piano } from './Piano/Layout'

export const App: React.FC = () => {
  return (
    <>
      <div className="w-full absolute bottom-0 right-0">
        <WindowDimensionsHandler />
        <KeyboardEventHandler />
        <MouseEventHandler />
      </div>

      <div className="container mx-auto p-12 font-dosis bg-white">
        <Piano />
      </div>
    </>
  )
}
