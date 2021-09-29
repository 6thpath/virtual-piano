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
  const persistedValue = localStorage.getItem(lsKey) as T[keyof T] | null

  if (persistedValue !== null && isValueInEnum(enumType, persistedValue)) {
    return persistedValue
  }

  localStorage.removeItem(lsKey)
}
