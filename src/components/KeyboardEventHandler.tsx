import { useEffect, Fragment } from 'react'

import { keyMapping, checkIsWhiteKey } from 'config'
import { synthesizer } from 'core'

import { keyContainerId, keyId } from 'components/Piano/Keyboard'

const addActiveStyle = (key: string, isWhiteKey = false): void => {
  document.getElementById(keyId(key))?.classList.add(isWhiteKey ? 'bg-neutral-3' : 'bg-neutral-6')
}

const removeActiveStyle = (key: string, isWhiteKey = false): void => {
  document.getElementById(keyId(key))?.classList.remove(isWhiteKey ? 'bg-neutral-3' : 'bg-neutral-6')
}

/**
 * Remove active style from all piano keyboard key
 */
const removeActiveStyleFromAllKeys = (isWhiteKey = false): void => {
  const parentElement = document.getElementById(keyContainerId[isWhiteKey ? 'whiteKey' : 'blackKey'])
  const keyElements = parentElement?.getElementsByClassName('piano-key') ?? []
  const keyCount = keyElements.length

  if (keyCount) {
    for (let i = 0; i < keyCount; i++) {
      keyElements[i].classList.remove(isWhiteKey ? 'bg-neutral-3' : 'bg-neutral-6')
    }
  }
}

const {
  controller,
  piano: { whiteKey, blackKey },
} = keyMapping

export const KeyboardEventHandler: React.FC = () => {
  useEffect(() => {
    const onKeyDown = ({ key, repeat }: KeyboardEvent) => {
      // Detects key holding and ignore it
      if (!repeat) {
        if (key === 'Shift') {
          removeActiveStyleFromAllKeys(true)
        } else if (whiteKey[key] || blackKey[key]) {
          const isWhiteKey = checkIsWhiteKey(key)

          synthesizer.playNote(isWhiteKey ? whiteKey[key][0] : blackKey[key][0])
          addActiveStyle(key, isWhiteKey)
        } else if (controller[key]) {
          // ! Implement later after migrate from react context to recoil
          console.log('Toggle', controller[key])
        }
      }
    }

    const onKeyUp = ({ key }: KeyboardEvent) => {
      if (key === 'Shift') {
        removeActiveStyleFromAllKeys()
      } else {
        removeActiveStyle(key, checkIsWhiteKey(key))
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return <Fragment />
}
