import { AtomEffect, DefaultValue } from 'recoil'

import { isValueInEnum } from 'utils'

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key)

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export const isPersistedValueValid = <T>(lsKey: string, enumType: T): T[keyof T] | undefined => {
  const persistedValue = localStorage.getItem(lsKey) as string | null

  if (persistedValue !== null) {
    const parsedValue = JSON.parse(persistedValue) as T[keyof T]

    if (isValueInEnum(enumType, parsedValue)) {
      return parsedValue
    }
  }

  localStorage.removeItem(lsKey)
}
