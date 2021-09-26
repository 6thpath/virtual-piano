import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import classnames from 'classnames'

import { SamplesExtension } from 'constant'
import { synthesize } from 'core'
import { pianoState } from 'store'

import { ControlPanel } from './ControlPanel'
import { Keyboard } from './Keyboard'
import { SAMPLES_EXTENSION } from 'store/id'

export const Piano: React.FC = () => {
  const [piano, setPianoState] = useRecoilState(pianoState)

  useEffect(() => {
    // ! `JSON.parse` is essential here because data retrieved from local storage was a stringified object
    const samplesExtension =
      JSON.parse(localStorage.getItem(SAMPLES_EXTENSION) as SamplesExtension) || SamplesExtension.OGG

    synthesize.initialize(samplesExtension, {
      onload: () => setPianoState((prevState) => ({ ...prevState, ready: true })),
    })
  }, [setPianoState])

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
