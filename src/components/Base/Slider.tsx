import { useRef, useState } from 'react'

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type Props = HTMLInputProps

/**
 * Force a value into a number. This is currently capped to 2 decimal
 * places.
 */
const forceNumber = function (n: string | number) {
  n = Number(n)
  if (isNaN(n) || typeof n === 'undefined') {
    n = 0
  }

  return n
}

export const Slider: React.FC<Props> = ({ value, step }) => {
  const sliderRef = useRef<HTMLInputElement>(null)
  const holdLoop = useRef()
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const onMouseDown = () => {
    setIsMouseDown(true)
  }

  const onMouseUp = () => {
    setIsMouseDown(false)
    setIsDragging(false)

    if (holdLoop.current) {
      clearInterval(holdLoop.current)
    }
  }

  // const onInput = (e) => {
  //   const newVal = forceNumber(e.target.value)

  //   if (
  //     // Disable the oninput filter with the user is dragging
  //     // the slider's knob.
  //     !(isMouseDown && isDragging) &&
  //     oldVal
  //   ) {
  //     e.target.value = newVal > oldVal ? oldVal + step : oldVal - step
  //   }
  // }

  return (
    <input
      type="range"
      ref={sliderRef}
      // min={props.min}
      // max={props.max}
      // step={props.step}
      // value={props.value}
      // onChange={props.onChange}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      // onMouseMove={onMouseMove}
      // onClick={onClick}
      // onInput={onInput}
    />
  )
}
