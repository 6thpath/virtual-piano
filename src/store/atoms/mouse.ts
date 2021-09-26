import { atom } from 'recoil'

import { TMouseClick } from 'type/Store'

import { MOUSE_CLICK } from '../id'

export const mouseClickState = atom<TMouseClick>({
  key: MOUSE_CLICK,
  default: {
    leftMouseDown: false,
    rightMouseDown: false,
  },
})
