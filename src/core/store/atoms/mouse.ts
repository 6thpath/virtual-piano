import { atom } from 'recoil'

import { MOUSE } from 'store/id'

export const mouseState = atom({
  key: MOUSE,
  default: {
    leftMouseDown: false,
    rightMouseDown: false,
  },
})
