'use client'

import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container,
} from '@mui/material'
import { useState } from 'react'
import WorkoutSummary from './WorkoutSummary'
import WorkoutNote from './WorkoutNote'
import { finishWorkout } from '@/domain/WorkoutSession/store'
import { useSnackbar } from 'notistack'

const NoteAndSave: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { enqueueSnackbar } = useSnackbar()

  const handleSave = () => {
    handleClose()
    finishWorkout()
    enqueueSnackbar(
      'Great job! You have successfully completed your workout session.',
      { variant: 'success' },
    )
  }

  return (
    <>
      <Box onClick={handleOpen} sx={{ display: 'contents' }}>
        {children}
      </Box>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', height: 'stretch' }}
        >
          <DialogTitle>Workout Review</DialogTitle>
          <DialogContent>
            <WorkoutSummary />
          </DialogContent>
          <DialogContent sx={{ flexShrink: 0, flexGrow: 0 }}>
            <DialogContentText variant='subtitle1' gutterBottom>
              Please review your workout notes before saving.
            </DialogContentText>
            <WorkoutNote />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Container>
      </Dialog>
    </>
  )
}

export default NoteAndSave
