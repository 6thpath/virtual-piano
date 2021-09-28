import { useEffect, Fragment } from 'react'
import { useSetRecoilState } from 'recoil'

import { mouseState } from 'store'

export const MouseEventHandler: React.FC = () => {
  const setMouseState = useSetRecoilState(mouseState)

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (event.button === 0) {
        setMouseState((prevState) => ({ ...prevState, leftMouseDown: true }))
      }
    }

    const onMouseUp = (event: MouseEvent) => {
      if (event.button === 0) {
        setMouseState((prevState) => ({ ...prevState, leftMouseDown: false }))
      }
    }

    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [setMouseState])

  return <Fragment />
}
