'use client'

import useWorkout, { updateWorkout } from '@/domain/WorkoutSession/store'
import { TextField } from '@mui/material'

const WorkoutNote = () => {
  const note = useWorkout(s => s.note)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    updateWorkout({
      note: value,
    })
  }

  return (
    <TextField
      label='Workout Note'
      multiline
      fullWidth
      value={note}
      onChange={handleChange}
      minRows={4}
    />
  )
}

export default WorkoutNote
