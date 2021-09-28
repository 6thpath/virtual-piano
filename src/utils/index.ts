export * from './keyboard'
export * from './reportWebVitals'

export const isValueInEnum = <T>(enumType: T, value: T[keyof T]): boolean => {
  return Object.values(enumType).indexOf(value) > -1
}

export const isPersistedValueValid = <T>(lsKey: string, enumType: T): T[keyof T] | undefined => {
  const persistedValue = localStorage.getItem(lsKey) as T[keyof T] | null

  if (persistedValue !== null && isValueInEnum(enumType, persistedValue)) {
    return persistedValue
  }

  localStorage.removeItem(lsKey)
}
