import { useCallback, useEffect, Fragment } from 'react'

import { keyMapping } from 'config'
import { synthesize } from 'core'
import { isWhiteKey, addActiveStyle, removeActiveStyle, removeActiveStyleFromAllKeys } from 'utils'

const {
  controller,
  piano: { whiteKeys, blackKeys },
} = keyMapping

export const KeyboardEventHandler: React.FC = () => {
  const onKeyDown = useCallback(({ key, repeat }: KeyboardEvent) => {
    // Detects key holding and ignore it
    if (!repeat) {
      if (key === 'Shift') {
        removeActiveStyleFromAllKeys(true)
      } else if (whiteKeys[key] || blackKeys[key]) {
        const whiteKey = isWhiteKey(key)

        synthesize.playNote(whiteKey ? whiteKeys[key][0] : blackKeys[key][0])
        addActiveStyle(key, whiteKey)
      } else if (controller[key]) {
        // ! Implement later after migrate from react context to recoil
        console.log('Toggle', controller[key])
      }
    }
  }, [])

  const onKeyUp = useCallback(({ key }: KeyboardEvent) => {
    if (key === 'Shift') {
      removeActiveStyleFromAllKeys()
    } else {
      removeActiveStyle(key, isWhiteKey(key))
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown, false)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [onKeyDown, onKeyUp])

  return <Fragment />
}

KeyboardEventHandler.displayName = 'KeyboardEventHandler'
