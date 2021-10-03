export * from './reportWebVitals'
export * from './safeViewInsets'

export const isValueInEnum = <T>(enumType: T, value: T[keyof T]): boolean => {
  return Object.values(enumType).indexOf(value) > -1
}
