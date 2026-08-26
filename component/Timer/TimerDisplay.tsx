'use client'

import { TextField } from '@mui/material'
import { useTimer } from '@/domain/share/hooks'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

type TimerDisplayProps = {
  endTime: Date
  onFinish: () => void
}

type EndedTimerDisplayProps = Pick<TimerDisplayProps, 'endTime'> & {
  startTime: Date
}

const formatRemain = (remain: number) => {
  const durationObj = dayjs.duration(remain, 'milliseconds')
  const hours = Math.floor(durationObj.asHours())
  const minutes = durationObj.minutes()
  const seconds = durationObj.seconds()

  let formatted = ''
  if (hours > 0) {
    formatted += `${hours.toString()}h `
  }

  formatted += `${minutes.toString().padStart(hours > 0 ? 2 : 1, '0')}m `
  formatted += `${seconds.toString().padStart(2, '0')}s`
  return formatted
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  endTime,
  onFinish,
}) => {
  const { remain } = useTimer({ endTime, onFinish })

  return (
    <TextField
      variant='filled'
      label='Remain'
      value={formatRemain(remain)}
      slotProps={{
        htmlInput: {
          readOnly: true,
        },
      }}
    />
  )
}

export const EndedTimerDisplay: React.FC<EndedTimerDisplayProps> = ({
  startTime,
  endTime,
}) => (
  <TextField
    variant='standard'
    label='Duration'
    value={formatRemain(dayjs(endTime).diff(dayjs(startTime)))}
    slotProps={{
      htmlInput: {
        readOnly: true,
      },
    }}
    disabled
  />
)
