import { atom } from 'recoil'

import { SamplesExtension, DisplayKey, KeyDetail } from 'constant'
import { localStorageEffect } from 'store/persistence'
import { TPianoState } from 'type/Store'

import { PIANO_READY, SAMPLES_EXTENSION, DISPLAY_KEY, KEY_DETAIL } from '../id'

export const pianoState = atom<TPianoState>({
  key: PIANO_READY,
  default: {
    ready: false,
    lock: false,
  },
})

export const samplesExtensionState = atom<SamplesExtension>({
  key: SAMPLES_EXTENSION,
  default: (localStorage.getItem(SAMPLES_EXTENSION) as SamplesExtension) ?? SamplesExtension.OGG,
  effects_UNSTABLE: [localStorageEffect(SAMPLES_EXTENSION)],
})

export const displayKeyState = atom<DisplayKey>({
  key: DISPLAY_KEY,
  default: (localStorage.getItem(DISPLAY_KEY) as DisplayKey) ?? DisplayKey.ON,
  effects_UNSTABLE: [localStorageEffect(DISPLAY_KEY)],
})

export const keyDetailState = atom<KeyDetail>({
  key: KEY_DETAIL,
  default: (localStorage.getItem(KEY_DETAIL) as KeyDetail) ?? KeyDetail.NONE,
  effects_UNSTABLE: [localStorageEffect(KEY_DETAIL)],
})
