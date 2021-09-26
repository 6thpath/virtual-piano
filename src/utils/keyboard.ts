import { keyMapping } from 'config'
import { WHITE_KEYS_CONTAINER_ID, BLACK_KEYS_CONTAINER_ID } from 'constant'

export const keyId = (key: string): string => `pianoKey-${key}`

export const isWhiteKey = (key: string): boolean => keyMapping.piano.whiteKeys[key] !== undefined

export const addActiveStyle = (key: string, whiteKey = false): void => {
  document.getElementById(keyId(key))?.classList.add(whiteKey ? 'bg-neutral-3' : 'bg-neutral-6')
}

export const removeActiveStyle = (key: string, whiteKey = false): void => {
  document.getElementById(keyId(key))?.classList.remove(whiteKey ? 'bg-neutral-3' : 'bg-neutral-6')
}

/**
 * Remove active style from all black or white keys
 */
export const removeActiveStyleFromAllKeys = (whiteKey = false): void => {
  const parentElement = document.getElementById(whiteKey ? WHITE_KEYS_CONTAINER_ID : BLACK_KEYS_CONTAINER_ID)
  const keyElements = parentElement?.getElementsByClassName('piano-key') ?? []
  const keyCount = keyElements.length

  if (keyCount) {
    for (let i = 0; i < keyCount; i++) {
      keyElements[i].classList.remove(whiteKey ? 'bg-neutral-3' : 'bg-neutral-6')
    }
  }
}
