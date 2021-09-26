import { useEffect, Fragment, useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { mouseClickState } from 'store'

export const MouseEventHandler: React.FC = () => {
  const setMouseClickState = useSetRecoilState(mouseClickState)

  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button === 0) {
        setMouseClickState((prevState) => ({ ...prevState, leftMouseDown: true }))
      }
    },
    [setMouseClickState]
  )

  const onMouseUp = useCallback(
    (event: MouseEvent) => {
      if (event.button === 0) {
        setMouseClickState((prevState) => ({ ...prevState, leftMouseDown: false }))
      }
    },
    [setMouseClickState]
  )

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseDown, onMouseUp])

  return <Fragment />
}
