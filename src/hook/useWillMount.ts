import { useRef, useEffect } from 'react'

export const useWillMount = (handler: () => void = () => {}): void => {
  const mounted = useRef<boolean>(false)
  if (!mounted.current) {
    handler()
  }

  useEffect(() => {
    mounted.current = true
  }, [])
}
