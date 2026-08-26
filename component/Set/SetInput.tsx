'use client'

import { Stack, TextField } from '@mui/material'
import useExercise, { updateExerciseSet } from '@/domain/Exercise/store'
import useExerciseCategory from '@/domain/ExerciseCategory/store'
import type { ExerciseCategoryByWeight } from '@/domain/ExerciseCategory/schema'
import type {
  ExerciseSetTypeWeight,
  ExerciseSetTypeTime,
} from '@/domain/Exercise/schema'
import { TimerInput, TimerDisplay, EndedTimerDisplay } from '@/component/Timer'
import dayjs from 'dayjs'
import { useCallback } from 'react'

type SetInputProps = {
  exerciseId: string
  setId: string
}

type SetTimeInputProps = SetInputProps & {
  onFinish: () => void
}

export const SetWeightInput: React.FC<SetInputProps> = ({
  exerciseId,
  setId,
}) => {
  const exercise = useExercise(exerciseId)
  const exCatId = exercise?.exCatId
  const unit = useExerciseCategory(
    s =>
      (s.exCats.find(c => c.id === exCatId) as ExerciseCategoryByWeight)
        .loadUnit,
  )
  if (!exercise) return null

  const set = exercise?.sets.find(s => s.id === setId) as
    | ExerciseSetTypeWeight
    | undefined
  if (!set) return null

  const started = Boolean(set.startedAt)
  const finished = Boolean(set.finishedAt)

  const handleChange = (field: keyof ExerciseSetTypeWeight, value: number) => {
    updateExerciseSet(exerciseId, setId, { [field]: value })
  }

  return (
    <Stack direction='row' spacing={2}>
      <TextField
        variant={finished ? 'standard' : started ? 'filled' : 'outlined'}
        type='number'
        label={`Load (${unit})`}
        value={set.load ?? ''}
        onChange={e => handleChange('load', Number(e.target.value))}
        slotProps={{
          htmlInput: {
            min: 0,
            step: 1,
            readOnly: started || finished,
          },
        }}
        required
        autoComplete='off'
        disabled={finished}
      />
      <TextField
        variant={finished ? 'standard' : started ? 'filled' : 'outlined'}
        type='number'
        label='Reps'
        value={set.reps ?? ''}
        onChange={e => handleChange('reps', Number(e.target.value))}
        slotProps={{
          htmlInput: {
            min: 0,
            step: 1,
            readOnly: started || finished,
          },
        }}
        required
        autoComplete='off'
        disabled={finished}
      />
    </Stack>
  )
}

export const SetTimeInput: React.FC<SetTimeInputProps> = ({
  exerciseId,
  setId,
  onFinish,
}) => {
  const set = useExercise(exerciseId)?.sets.find(s => s.id === setId) as
    | ExerciseSetTypeTime
    | undefined

  const handleFinish = useCallback(() => {
    onFinish()
  }, [onFinish])

  if (!set) return null

  const started = Boolean(set.startedAt)
  const finished = Boolean(set.finishedAt)

  const handleChange = (value?: number) => {
    updateExerciseSet(exerciseId, setId, { durationInSeconds: value })
  }

  return (
    <Stack>
      {!started && !finished && (
        <TimerInput
          value={set.durationInSeconds ?? 0}
          onChange={handleChange}
        />
      )}
      {started && !finished && (
        <TimerDisplay
          endTime={dayjs(set.startedAt)
            .add(set.durationInSeconds ?? 0, 'seconds')
            .toDate()}
          onFinish={handleFinish}
        />
      )}
      {started && finished && (
        <EndedTimerDisplay
          startTime={set.startedAt!}
          endTime={set.finishedAt!}
        />
      )}
    </Stack>
  )
}
