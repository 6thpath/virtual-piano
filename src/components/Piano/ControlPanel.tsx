import { SwitchSamples } from './SwitchSamples'
import { SwitchDisplayKey } from './SwitchDisplayKey'
import { SwitchKeyDetail } from './SwitchKeyDetail'
import { VolumeBar } from './VolumeBar'

export const ControlPanel: React.FC = () => {
  return (
    <div className="w-full flex justify-between px-12 py-24 bg-black font-dosis text-white text-center">
      <div className="flex">
        <SwitchSamples />
        <SwitchDisplayKey />
        <SwitchKeyDetail />
      </div>

      <div className="flex-1 flex justify-center items-center">Open Piano</div>

      <div className="flex">
        <VolumeBar />
      </div>
    </div>
  )
}
