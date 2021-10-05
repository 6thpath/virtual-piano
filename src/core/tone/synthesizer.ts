import { ToneAudioBuffer, SamplerOptions, Sampler } from 'tone'
import { NormalRange, Time } from 'tone/build/esm/core/type/Units'

import { SamplesExtension } from 'constant'

import { noteNames } from './music-notes'

type TSamplesMap = {
  [note: string]: ToneAudioBuffer | AudioBuffer | string
  [midi: number]: ToneAudioBuffer | AudioBuffer | string
}

type TSynthesizerOptions = Partial<Omit<SamplerOptions, 'baseUrl'>>

class Synthesizer {
  private _synthesizer?: Sampler

  private _createSamplesMap = (extension: SamplesExtension): TSamplesMap => {
    return noteNames.reduce(
      (map, note) => ((map[note] = `${note.replace('#', 's')}.${extension}`), map),
      {} as { [key: string]: string }
    )
  }

  private _createSynthesizer = (
    samplesMap: TSamplesMap,
    { onload, onerror, ...restOptions }: TSynthesizerOptions
  ): Sampler => {
    return new Sampler(samplesMap, {
      baseUrl: `${process.env.PUBLIC_URL}/samples/`,
      onload: () => {
        console.debug('[Synthesizer] Sampler ready!')
        onload?.()
      },
      onerror: (error) => {
        console.debug('[Synthesizer] An error occurred while initializing:', error)
        onerror?.(error)
      },
      ...restOptions,
    }).toDestination()
  }

  public initialize = (extension: SamplesExtension, options: TSynthesizerOptions = {}): void => {
    const samplesMap = this._createSamplesMap(extension)

    this._synthesizer = this._createSynthesizer(samplesMap, options)
  }

  public get instance(): Sampler | undefined {
    return this._synthesizer
  }

  public playNote = (
    noteName: string,
    duration = '1n',
    time?: Time,
    velocity?: NormalRange
  ): void => {
    if (this._synthesizer) {
      try {
        this._synthesizer.triggerAttackRelease(noteName, duration, time, velocity)
      } catch (error) {
        console.debug(error)
      }
    }
  }
}

export const synthesizer = new Synthesizer()
