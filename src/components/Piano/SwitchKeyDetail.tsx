import { useRecoilState } from 'recoil'

import { KeyDetail } from 'constant'
import { keyDetailState } from 'core/store'

import { Switch } from 'components/Base/Switch'

const keyDetailOptions = Object.values(KeyDetail)

export const SwitchKeyDetail: React.FC = () => {
  const [keyDetail, setKeyDetail] = useRecoilState(keyDetailState)

  const handleClickLabelKeyDetail = () => {
    setKeyDetail((prevState) => {
      const valueIndex = keyDetailOptions.indexOf(prevState)

      if (prevState === keyDetailOptions[keyDetailOptions.length - 1]) {
        return keyDetailOptions[0]
      } else {
        return keyDetailOptions[valueIndex + 1]
      }
    })
  }

  const onChangeKeyDetail = (option: string) => {
    setKeyDetail(option as KeyDetail)
  }

  return (
    <div className="flex flex-col items-center ml-12">
      <div className="cursor-pointer mb-8 text-md" onClick={handleClickLabelKeyDetail}>
        Key detail
      </div>
      <Switch id="switchKeyDetail" options={keyDetailOptions} value={keyDetail} onChange={onChangeKeyDetail} />
    </div>
  )
}
