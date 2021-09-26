import { useRef, useEffect } from 'react'

export const useDidMount = (): boolean => {
  const mounted = useRef<boolean>(false)

  useEffect(() => {
    mounted.current = true
  }, [])

  return mounted.current
}
