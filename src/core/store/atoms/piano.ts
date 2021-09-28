import { atom } from 'recoil'

import { SamplesExtension, DisplayKey, KeyDetail } from 'constant'
import { localStorageEffect } from 'core/store/persistence'
import { isPersistedValueValid } from 'utils'

import { PIANO, SAMPLES_EXTENSION, DISPLAY_KEY, KEY_DETAIL } from 'core/store/id'

export const pianoState = atom({
  key: PIANO,
  default: {
    ready: false,
    lock: false,
  },
})

const initialSamplesExtensionState = isPersistedValueValid(SAMPLES_EXTENSION, SamplesExtension) ?? SamplesExtension.OGG
export const samplesExtensionState = atom({
  key: SAMPLES_EXTENSION,
  default: initialSamplesExtensionState,
  effects_UNSTABLE: [localStorageEffect(SAMPLES_EXTENSION)],
})

const initialDisplayKeyState = isPersistedValueValid(DISPLAY_KEY, DisplayKey) ?? DisplayKey.ON
export const displayKeyState = atom({
  key: DISPLAY_KEY,
  default: initialDisplayKeyState,
  effects_UNSTABLE: [localStorageEffect(DISPLAY_KEY)],
})

const initialKeyDetailState = isPersistedValueValid(KEY_DETAIL, KeyDetail) ?? KeyDetail.NONE
export const keyDetailState = atom({
  key: KEY_DETAIL,
  default: initialKeyDetailState,
  effects_UNSTABLE: [localStorageEffect(KEY_DETAIL)],
})
