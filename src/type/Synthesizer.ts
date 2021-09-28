import { ToneAudioBuffer, SamplerOptions } from 'tone'

export type TSamplesMap = {
  [note: string]: ToneAudioBuffer | AudioBuffer | string
  [midi: number]: ToneAudioBuffer | AudioBuffer | string
}

export type TSynthesizerOptions = Partial<Omit<SamplerOptions, 'baseUrl'>>
