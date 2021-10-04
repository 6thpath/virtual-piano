import { atom } from 'recoil'

export const mouseState = atom({
  key: 'mouse/mouseButtons',
  default: {
    leftMouseDown: false,
    isKeyClickDisabled: false,
    rightMouseDown: false,
  },
})
