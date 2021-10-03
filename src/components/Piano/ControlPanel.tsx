import { SwitchSamples } from './SwitchSamples'
import { SwitchDisplayKey } from './SwitchDisplayKey'
import { SwitchKeyDetail } from './SwitchKeyDetail'
import { VolumeBar } from './VolumeBar'

export const ControlPanel: React.FC = () => {
  return (
    <div className="w-full flex justify-between px-12 py-24 bg-black">
      <div className="flex text-white">
        <SwitchSamples />
        <SwitchDisplayKey />
        <SwitchKeyDetail />
      </div>

      <div className="flex flex-1 justify-center items-center">
        <h5 className="text-white">Virtual Piano</h5>
      </div>

      <div className="flex">
        <VolumeBar />
      </div>
    </div>
  )
}
