import { atom } from 'recoil'

import { SamplesExtension, DisplayKey, KeyDetail } from 'constant'
import { localStorageEffect, isPersistedValueValid } from 'core/store/persistence'

export const pianoState = atom({
  key: 'piano/piano',
  default: {
    isReady: false,
    isLocked: false,
  },
})

export const pianoTypeState = atom({
  key: 'piano/pianoType',
  default: undefined,
})

export const samplesExtensionStateKey = 'piano/samplesExtension'
const defaultSamplesExtensionState =
  isPersistedValueValid(samplesExtensionStateKey, SamplesExtension) ?? SamplesExtension.MP3
export const samplesExtensionState = atom({
  key: samplesExtensionStateKey,
  default: defaultSamplesExtensionState,
  effects_UNSTABLE: [localStorageEffect(samplesExtensionStateKey)],
})

export const displayKeyStateKey = 'piano/displayKey'
const defaultDisplayKeyState =
  isPersistedValueValid(displayKeyStateKey, DisplayKey) ?? DisplayKey.ON
export const displayKeyState = atom({
  key: displayKeyStateKey,
  default: defaultDisplayKeyState,
  effects_UNSTABLE: [localStorageEffect(displayKeyStateKey)],
})

export const keyDetailStateKey = 'piano/keyDetail'
const defaultKeyDetailState = isPersistedValueValid(keyDetailStateKey, KeyDetail) ?? KeyDetail.NONE
export const keyDetailState = atom({
  key: keyDetailStateKey,
  default: defaultKeyDetailState,
  effects_UNSTABLE: [localStorageEffect(keyDetailStateKey)],
})
