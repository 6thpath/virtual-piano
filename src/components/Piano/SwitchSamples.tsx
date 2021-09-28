import { useRef, useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { SamplesExtension } from 'constant'
import { synthesize } from 'core'
import { samplesExtensionState, pianoState } from 'core/store'

import { Switch } from 'components/Base/Switch'

const samplesExtensionOptions = Object.values(SamplesExtension)

export const SwitchSamples: React.FC = () => {
  // ! A boolean ref to detect first render
  const didMountRef = useRef<boolean>(false)
  const [samplesExtension, setSamplesExtension] = useRecoilState(samplesExtensionState)
  const setPianoState = useSetRecoilState(pianoState)

  const handleClickLabelSamples = () => {
    setSamplesExtension((prevState) =>
      prevState === SamplesExtension.MP3 ? SamplesExtension.OGG : SamplesExtension.MP3
    )
  }

  const onChangeSamples = (option: string) => {
    setSamplesExtension(option as SamplesExtension)
  }

  useEffect(() => {
    // ! Skip init on first render
    if (didMountRef.current) {
      setPianoState((prevState) => ({ ...prevState, lock: true }))

      synthesize.initialize(samplesExtension, {
        onload: () => setPianoState((prevState) => ({ ...prevState, lock: false })),
      })
    } else {
      didMountRef.current = true
    }
  }, [samplesExtension, setPianoState])

  return (
    <div className="flex flex-col items-center">
      <div className="cursor-pointer mb-8 text-md" onClick={handleClickLabelSamples}>
        Samples
      </div>
      <Switch
        id="switchSamples"
        options={samplesExtensionOptions}
        value={samplesExtension}
        onChange={onChangeSamples}
      />
    </div>
  )
}
