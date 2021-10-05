import { TNoteName, TSyllable, TNote } from 'core'

type TPianoKey = 'whiteKey' | 'blackKey'
type TKeyMapping = {
  controller: Record<string, string>
  piano: {
    [key in TPianoKey]: Record<string, [TNoteName, TSyllable] | [TNoteName, TNote, TNote, string]>
  }
}

export const keyMapping: TKeyMapping = {
  controller: {
    '`': 'displayKey',
    '~': 'keyDetail',
  },
  piano: {
    whiteKey: {
      '1': ['C2', 'Do'],
      '2': ['D2', 'Re'],
      '3': ['E2', 'Mi'],
      '4': ['F2', 'Fa'],
      '5': ['G2', 'Sol'],
      '6': ['A2', 'La'],
      '7': ['B2', 'Si'],
      '8': ['C3', 'Do'],
      '9': ['D3', 'Re'],
      '0': ['E3', 'Mi'],
      q: ['F3', 'Fa'],
      w: ['G3', 'Sol'],
      e: ['A3', 'La'],
      r: ['B3', 'Si'],
      t: ['C4', 'Do'],
      y: ['D4', 'Re'],
      u: ['E4', 'Mi'],
      i: ['F4', 'Fa'],
      o: ['G4', 'Sol'],
      p: ['A4', 'La'],
      a: ['B4', 'Si'],
      s: ['C5', 'Do'],
      d: ['D5', 'Re'],
      f: ['E5', 'Mi'],
      g: ['F5', 'Fa'],
      h: ['G5', 'Sol'],
      j: ['A5', 'La'],
      k: ['B5', 'Si'],
      l: ['C6', 'Do'],
      z: ['D6', 'Re'],
      x: ['E6', 'Mi'],
      c: ['F6', 'Fa'],
      v: ['G6', 'Sol'],
      b: ['A6', 'La'],
      n: ['B6', 'Si'],
      m: ['C7', 'Do'],
    },

    blackKey: {
      '!': ['C#2', 'C', 'D', 'C♯2'],
      '@': ['D#2', 'D', 'E', 'D♯2'],
      $: ['F#2', 'F', 'G', 'F♯2'],
      '%': ['G#2', 'G', 'A', 'G♯2'],
      '^': ['A#2', 'A', 'B', 'A♯2'],
      '*': ['C#3', 'C', 'D', 'C♯3'],
      '(': ['D#3', 'D', 'E', 'D♯3'],
      Q: ['F#3', 'F', 'G', 'F♯3'],
      W: ['G#3', 'G', 'A', 'G♯3'],
      E: ['A#3', 'A', 'B', 'A♯3'],
      T: ['C#4', 'C', 'D', 'C♯4'],
      Y: ['D#4', 'D', 'E', 'D♯4'],
      I: ['F#4', 'F', 'G', 'F♯4'],
      O: ['G#4', 'G', 'A', 'G♯4'],
      P: ['A#4', 'A', 'B', 'A♯4'],
      S: ['C#5', 'C', 'D', 'C♯5'],
      D: ['D#5', 'D', 'E', 'D♯5'],
      G: ['F#5', 'F', 'G', 'F♯5'],
      H: ['G#5', 'G', 'A', 'G♯5'],
      J: ['A#5', 'A', 'B', 'A♯5'],
      L: ['C#6', 'C', 'D', 'C♯6'],
      Z: ['D#6', 'D', 'E', 'D♯6'],
      C: ['F#6', 'F', 'G', 'F♯6'],
      V: ['G#6', 'G', 'A', 'G♯6'],
      B: ['A#6', 'A', 'B', 'A♯6'],
    },
  },
}

export const checkIsWhiteKey = (key: string): boolean =>
  keyMapping.piano.whiteKey[key] !== undefined
