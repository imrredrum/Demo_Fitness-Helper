'use client'

import useWorkout from '@/domain/WorkoutSession/store'
import { Summary } from '../Summary'
import { cleanupExerciseRecord } from '@/domain/share/utils'
import { Stack, Typography, Divider } from '@mui/material'
import dayjs from 'dayjs'

const WorkoutSummary: React.FC = () => {
  const workout = useWorkout(s => s)

  if (!workout || !workout.startedAt) {
    return <div>No workout data available.</div>
  }

  return (
    <>
      <Stack
        direction='row'
        spacing={1}
        sx={{ alignItems: 'center', justifyContent: 'flex-start', mb: 2 }}
      >
        <Typography variant='subtitle2' color='textSecondary'>
          開始時間：{dayjs(workout.startedAt).format('M/D HH:mm')}
        </Typography>
        <Divider orientation='vertical' flexItem />
        <Typography variant='subtitle2' color='textSecondary'>
          結束時間：{dayjs(workout.finishedAt).format('M/D HH:mm')}
        </Typography>
      </Stack>
      <Summary
        workout={{
          id: 'current',
          startedAt: workout.startedAt,
          finishedAt: new Date(),
          exercise: cleanupExerciseRecord(workout.exercise),
          note: workout.note,
        }}
      />
    </>
  )
}

export default WorkoutSummary
