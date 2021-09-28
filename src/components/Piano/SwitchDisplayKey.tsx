import { useRecoilState } from 'recoil'

import { DisplayKey } from 'constant'
import { displayKeyState } from 'core/store'

import { Switch } from 'components/Base/Switch'

const displayKeyOptions = Object.values(DisplayKey)

export const SwitchDisplayKey: React.FC = () => {
  const [displayKey, setDisplayKey] = useRecoilState(displayKeyState)

  const handleClickLabelDisplayKey = () => {
    setDisplayKey((prevState) => (prevState === DisplayKey.ON ? DisplayKey.OFF : DisplayKey.ON))
  }

  const onChangeDisplayKey = (option: string) => {
    setDisplayKey(option as DisplayKey)
  }

  return (
    <div className="flex flex-col items-center ml-12">
      <div className="cursor-pointer mb-8 text-md" onClick={handleClickLabelDisplayKey}>
        Display key
      </div>
      <Switch id="switchDisplayKey" options={displayKeyOptions} value={displayKey} onChange={onChangeDisplayKey} />
    </div>
  )
}
