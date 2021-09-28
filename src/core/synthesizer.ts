import { Sampler } from 'tone'

import { SamplesExtension } from 'constant'
import { noteNames, samplesUrl } from 'config'

import { ToneAudioBuffer, SamplerOptions } from 'tone'

type TSamplesMap = {
  [note: string]: ToneAudioBuffer | AudioBuffer | string
  [midi: number]: ToneAudioBuffer | AudioBuffer | string
}

type TSynthesizerOptions = Partial<Omit<SamplerOptions, 'baseUrl'>>

class Synthesizer {
  private _synthesizer?: Sampler

  public createSamplesMap = (extension: SamplesExtension): TSamplesMap => {
    return noteNames.reduce(
      (map, note) => ((map[note] = `${note.replace('#', 's')}.${extension}`), map),
      {} as { [key: string]: string }
    )
  }

  public createSynthesizer = (samplesMap: TSamplesMap, options: TSynthesizerOptions): Sampler => {
    const { onload = () => {}, onerror = () => {}, ...restOptions } = options

    return new Sampler(samplesMap, {
      baseUrl: samplesUrl,
      onload: () => {
        console.debug('[Synthesizer] Sampler ready!')
        onload()
      },
      onerror: (error) => {
        console.debug('[Synthesizer] An error occurred:', error)
        onerror(error)
      },
      ...restOptions,
    }).toDestination()
  }

  public initialize = (extension: SamplesExtension, options: TSynthesizerOptions = {}): void => {
    const samplesMap = this.createSamplesMap(extension)

    this._synthesizer = this.createSynthesizer(samplesMap, options)
  }

  public get instance(): Sampler | undefined {
    return this._synthesizer
  }

  public playNote = (noteName: string, duration = '1n'): void => {
    if (this._synthesizer) {
      try {
        this._synthesizer.triggerAttackRelease(noteName, duration)
      } catch (error) {
        console.debug(error)
      }
    }
  }
}

export const synthesize = new Synthesizer()
