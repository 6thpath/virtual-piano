const safeInsetTop = getComputedStyle(document.documentElement).getPropertyValue('--safe-inset-top')
const safeInsetRight = getComputedStyle(document.documentElement).getPropertyValue(
  '--safe-inset-right'
)
const safeInsetBottom = getComputedStyle(document.documentElement).getPropertyValue(
  '--safe-inset-bottom'
)
const safeInsetLeft = getComputedStyle(document.documentElement).getPropertyValue(
  '--safe-inset-left'
)

export const safeViewInsets = {
  top: safeInsetTop,
  right: safeInsetRight,
  bottom: safeInsetBottom,
  left: safeInsetLeft,
}
