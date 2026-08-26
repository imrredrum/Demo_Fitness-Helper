'use client'

import { useState } from 'react'
import { Box, Dialog, TextField, Typography } from '@mui/material'
import useExercise, { updateExerciseSet } from '@/domain/Exercise/store'

type NoteDialogProps = {
  exerciseId: string
  setId: string
}

const NoteInput: React.FC<React.PropsWithChildren<NoteDialogProps>> = ({
  exerciseId,
  setId,
}) => {
  const exercise = useExercise(exerciseId)
  if (!exercise) return null

  const set = exercise.sets.find(s => s.id === setId)
  if (!set) return null

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNote = event.target.value
    updateExerciseSet(exerciseId, setId, { note: newNote })
  }

  return (
    <TextField
      label='Note'
      multiline
      fullWidth
      minRows={6}
      value={set.note ?? ''}
      onChange={handleChange}
    />
  )
}

const NoteDialog: React.FC<React.PropsWithChildren<NoteDialogProps>> = ({
  children,
  exerciseId,
  setId,
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box onClick={handleOpen} sx={{ display: 'contents' }}>
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ p: 2, minWidth: 300 }}>
          <Typography variant='h6' gutterBottom>
            Edit Note
          </Typography>
          <NoteInput exerciseId={exerciseId} setId={setId} />
        </Box>
      </Dialog>
    </>
  )
}

export default NoteDialog
