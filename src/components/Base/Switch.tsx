import classnames from 'classnames'

type Props<T> = React.PropsWithChildren<{
  id: string
  options: T[]
  value: T
  onChange: (option: T) => void
}>

export const Switch = <T extends string>({
  id,
  options,
  value,
  onChange,
}: Props<T>): React.ReactElement | null => {
  const valueIndex = options.indexOf(value)

  if (!options.length) {
    return null
  }

  const handleDotClick = () => {
    if (value === options[options.length - 1]) {
      onChange(options[0])
    } else {
      onChange(options[valueIndex + 1])
    }
  }

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // Due to The data is only available `onDrop` event
    // this is a security feature since a website could grab data
    // when you happen to be dragging something across the webpage.
    // ! So we swap `key` and `data` as a work around / hack
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
    event.dataTransfer.setData(id, 'text/plain')
    event.dataTransfer.effectAllowed = 'move'
    event.currentTarget.classList.remove('hover:bg-neutral-7')
    event.currentTarget.classList.add('opacity-0', 'shadow-xl', 'cursor-grab')
  }

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.add('hover:bg-neutral-7')
    event.currentTarget.classList.remove('opacity-0', 'shadow-xl', 'cursor-move')
  }

  const onDragEnter = (event: React.DragEvent<HTMLDivElement>, option: T) => {
    // ! Gets the `data` from `dataTransfer.types` instead of `dataTransfer.getData`
    // ! dataTransfer.types are automatically lowercased, so the `id` need to be lowercased too
    if (event.dataTransfer.types[0] === id.toLowerCase() && value !== option) {
      event.dataTransfer.dropEffect = 'move'
      onChange(option)
    }
  }

  return (
    <div
      className="relative flex flex-col rounded-15 p-2 bg-white font-dosis"
      style={{ height: 20 * options.length + 4 }}
      onDragOver={(event) => event.preventDefault()}
    >
      {options.map((option, index) => (
        <div
          key={index}
          title={option}
          className={classnames(
            'cursor-pointer w-20 h-20 flex justify-center items-center rounded-15 text-xs font-bold transition-all',
            {
              'text-neutral-6': value !== option,
              'text-white': value === option,
            }
          )}
          onClick={() => onChange(option)}
          onDragEnter={(event) => onDragEnter(event, option)}
          onDragOver={(event) => event.preventDefault()}
        >
          {option.slice(0, 3)}
        </div>
      ))}

      <div
        id={id}
        className={classnames(
          'cursor-grab active:cursor-grabbing',
          'w-20 h-20 absolute',
          'flex justify-center items-center',
          'rounded-full bg-black hover:bg-neutral-7 text-xs tetx-white transition-all'
        )}
        style={{ left: 2, top: 2 + valueIndex * 20 }}
        onClick={handleDotClick}
        title={options[valueIndex]}
        draggable
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {value.slice(0, 3)}
      </div>
    </div>
  )
}
