import { Fragment, useEffect } from 'react'
import debounce from 'lodash.debounce'

export const WindowDimensionsHandler: React.FC = () => {
  useEffect(() => {
    const handleResize = () => {}
    const debouncedResizeHandler = debounce(handleResize, 500)

    handleResize()

    window.addEventListener('resize', debouncedResizeHandler)

    return () => {
      window.removeEventListener('resize', debouncedResizeHandler)
    }
  }, [])

  return <Fragment />
}
