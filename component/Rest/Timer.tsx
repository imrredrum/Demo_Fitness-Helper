'use client'

import { Box, Fab, Stack } from '@mui/material'
import { useCallback } from 'react'
import useRest, { modifyRestSessionEndTime } from '@/domain/RestSession/store'
import { TimerDisplay } from '../Timer'

type TimerProps = {
  onFinish: () => void
}

const Timer: React.FC<TimerProps> = ({ onFinish }) => {
  const endTime = useRest(s => s.endTime)

  const handleFinish = useCallback(() => {
    onFinish()
  }, [onFinish])

  const handleModifyEndTime = (seconds: number) => () => {
    if (!endTime) return
    modifyRestSessionEndTime(seconds)
  }

  if (!endTime) return null

  return (
    <Box sx={{ display: 'contents' }}>
      <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
        <Fab
          size='small'
          onClick={handleModifyEndTime(-5)}
          sx={{ borderRadius: 2 }}
        >
          -5s
        </Fab>

        <TimerDisplay endTime={endTime} onFinish={handleFinish} />
        <Fab
          size='small'
          onClick={handleModifyEndTime(5)}
          sx={{ borderRadius: 2 }}
        >
          +5s
        </Fab>
      </Stack>
    </Box>
  )
}

export default Timer
