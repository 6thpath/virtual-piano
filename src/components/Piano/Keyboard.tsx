import { useRecoilValue } from 'recoil'
import classnames from 'classnames'

import { TKey, keyMapping, checkIsWhiteKey, keyboardConfig } from 'config'
import { DisplayKey, KeyDetail } from 'constant'
import { synthesizer } from 'core'
import { displayKeyState, keyDetailState, mouseState } from 'core/store'

const { whiteKey, blackKey } = keyMapping.piano

type RenderKeyDetailOptions = {
  keyDetail: KeyDetail
  key: TKey
  flat?: boolean
}

export const keyContainerId = {
  blackKey: 'blackKeyContainer',
  whiteKey: 'whiteKeyContainer',
}

/** Generate piano key element ID */
export const keyId = (key: string): string => `pianoKey-${key}`

const keyWidth = 'md:w-key-md lg:w-key-lg xl:w-key-xl 2xl:w-key-2xl'
const keySpacing = 'md:pb-4 lg:pb-8'

const whiteKeyClassnames = classnames(
  'bg-white hover:bg-neutral-2 text-neutral-9',
  keyWidth,
  'font-semibold font-dosis tabular-nums antialiased',
  'h-full flex flex-col justify-end items-center border border-black transition-all'
)

const blackKeysContainer = classnames(
  'pointer-events-none',
  'w-full',
  'md:h-bkey-md lg:h-bkey-lg xl:h-bkey-xl 2xl:h-bkey-2xl',
  'absolute top-2',
  'md:left-10 lg:left-13 xl:left-16 2xl:left-20',
  'flex justify-center',
  'border border-t-0 border-b-0 border-transparent'
)
const blackKeyWrapper = classnames(keyWidth, 'h-full', 'flex justify-center', 'bg-transparent')
const blackKeyClassnames = classnames(
  'pointer-events-auto',
  'bg-black hover:bg-neutral-7 text-white',
  'font-semibold font-dosis tabular-nums antialiased',
  'w-5/6 h-full',
  'flex flex-col justify-end items-center',
  'md:text-10 lg:text-12 xl:text-14',
  'transition-all'
)

const renderKeyDetail = ({ keyDetail, key, flat = false }: RenderKeyDetailOptions) => {
  switch (keyDetail) {
    case KeyDetail.NOTE_NAME:
      return checkIsWhiteKey(key) ? whiteKey[key][0] : flat ? '' : blackKey[key][3]

    case KeyDetail.SYLLABLE:
      return checkIsWhiteKey(key) ? whiteKey[key][1] : `${blackKey[key][flat ? 1 : 2]}${flat ? '♭' : '♯'}`

    default:
      return ''
  }
}

export const Keyboard: React.FC = () => {
  const displayKey = useRecoilValue(displayKeyState)
  const keyDetail = useRecoilValue(keyDetailState)
  const { leftMouseDown } = useRecoilValue(mouseState)

  const onClickPianoKey = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
    const isWhiteKey = checkIsWhiteKey(key)

    synthesizer.playNote(isWhiteKey ? whiteKey[key][0] : blackKey[key][0])
  }

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, key: string) => {
    event.stopPropagation()

    if (leftMouseDown) {
      const isWhiteKey = checkIsWhiteKey(key)

      synthesizer.playNote(isWhiteKey ? whiteKey[key][0] : blackKey[key][0])
    }
  }

  return (
    <div className="relative">
      <div
        id={keyContainerId.whiteKey}
        className="md:h-wkey-md lg:h-wkey-lg xl:h-wkey-xl 2xl:h-wkey-2xl flex flex-row border border-black"
      >
        {keyboardConfig.whiteKeys.map((key, index) => (
          <div
            key={index}
            id={keyId(key)}
            className={`piano-key ${whiteKeyClassnames}`}
            onMouseDown={(event) => onClickPianoKey(event, key)}
            onMouseEnter={(event) => onMouseEnter(event, key)}
          >
            <div className="mb-4 px-4 bg-black text-md text-white">{renderKeyDetail({ keyDetail, key })}</div>
            <div className={classnames({ [keySpacing]: displayKey === DisplayKey.ON })}>
              {displayKey === DisplayKey.ON ? key : ''}
            </div>
          </div>
        ))}
      </div>

      <div id={keyContainerId.blackKey} className={blackKeysContainer}>
        {keyboardConfig.blackKeys.map((key, index) => {
          if (key === undefined) {
            return <div key={index} className={`${blackKeyWrapper} pointer-events-none`} />
          }

          return (
            <div key={index} className={blackKeyWrapper}>
              <div
                id={keyId(key)}
                className={`piano-key ${blackKeyClassnames}`}
                onMouseDown={(event) => onClickPianoKey(event, key)}
                onMouseEnter={(event) => onMouseEnter(event, key)}
              >
                <div className="mb-4 px-4 bg-white text-xs text-black">
                  {renderKeyDetail({ keyDetail, key, flat: true })}
                </div>
                <div className="mb-4 px-4 bg-white text-xs text-black">{renderKeyDetail({ keyDetail, key })}</div>
                <div className={classnames({ [keySpacing]: displayKey === DisplayKey.ON })}>
                  {displayKey === DisplayKey.ON ? key : ''}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
