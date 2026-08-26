'use client'

import { TextField } from '@mui/material'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useState } from 'react'

dayjs.extend(duration)

type TimerInputProps = {
  value: number
  onChange: (newValue?: number) => void
  slotProps?: React.ComponentProps<typeof TextField>['slotProps']
}

const convertInputValue = (inputValue: string) => {
  let digits = inputValue.replace(/\D/g, '')
  if (digits.length > 6) digits = digits.slice(-6)
  digits = digits.padStart(6, '0')

  const hours = digits.slice(0, 2)
  const minutes = digits.slice(2, 4)
  const seconds = digits.slice(4, 6)

  return `${hours}:${minutes}:${seconds}`
}

const TimerInput: React.FC<TimerInputProps> = ({
  value,
  onChange,
  slotProps,
}) => {
  const [timeString, setTimeString] = useState(() =>
    value
      ? Math.floor(dayjs.duration(value, 'seconds').asHours())
          .toString()
          .padStart(2, '0') +
        ':' +
        dayjs.duration(value, 'seconds').minutes().toString().padStart(2, '0') +
        ':' +
        dayjs.duration(value, 'seconds').seconds().toString().padStart(2, '0')
      : '00:00:00',
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTimeString = convertInputValue(e.target.value)
    setTimeString(newTimeString)
    const [hours, minutes, seconds] = newTimeString.split(':').map(Number)

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      onChange(undefined)
    } else {
      onChange(dayjs.duration({ hours, minutes, seconds }).asSeconds())
    }
  }

  return (
    <TextField
      variant='outlined'
      label='Time (hh:mm:ss)'
      value={timeString}
      onChange={handleChange}
      slotProps={{
        ...slotProps,
        htmlInput: {
          inputMode: 'numeric',
          pattern: '[0-9]*',
          ...slotProps?.htmlInput,
        },
      }}
    />
  )
}

export default TimerInput
