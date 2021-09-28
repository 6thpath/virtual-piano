import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import classnames from 'classnames'

import { synthesize } from 'core'
import { pianoState, samplesExtensionState } from 'core/store'

import { ControlPanel } from './ControlPanel'
import { Keyboard } from './Keyboard'

export const Piano: React.FC = () => {
  const [piano, setPianoState] = useRecoilState(pianoState)
  const samplesExtension = useRecoilValue(samplesExtensionState)

  useEffect(() => {
    synthesize.initialize(samplesExtension, {
      onload: () => setPianoState((prevState) => ({ ...prevState, ready: true })),
    })
  }, [samplesExtension, setPianoState])

  if (!piano.ready) {
    return null
  }

  return (
    <div className="select-none flex justify-center">
      <div
        className={classnames(
          'md:w-746 lg:w-978 xl:w-1218 2xl:w-1506',
          'rounded-15',
          'md:px-12 md:pb-8 lg:px-20 xl:px-32 xl:pb-12',
          ' bg-black transition-all'
        )}
      >
        <ControlPanel />
        <Keyboard />
      </div>
    </div>
  )
}
