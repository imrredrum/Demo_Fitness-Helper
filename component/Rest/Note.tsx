'use client'

import useExercise, { updateExerciseSet } from '@/domain/Exercise/store'
import useRest from '@/domain/RestSession/store'
import { Container, TextField } from '@mui/material'

const Note: React.FC = () => {
  const exId = useRest(s => s.exId)
  const setId = useRest(s => s.setId)

  const note =
    useExercise(exId ?? '')?.sets.find(s => s.id === setId)?.note ?? ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!exId || !setId) return
    const newNote = e.target.value
    updateExerciseSet(exId, setId, { note: newNote })
  }

  return (
    <Container sx={{ maxWidth: 'sm' }}>
      <TextField
        variant='outlined'
        label='Notes'
        value={note}
        onChange={handleChange}
        multiline
        fullWidth
        minRows={6}
        maxRows={6}
      />
    </Container>
  )
}

export default Note
