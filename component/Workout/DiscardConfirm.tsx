import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { resetWorkout } from '@/domain/WorkoutSession/store'

const DiscardConfirm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDiscard = () => {
    resetWorkout()
    handleClose()
  }

  return (
    <>
      <Box onClick={handleOpen} sx={{ display: 'contents' }}>
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Discard Workout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to discard this workout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDiscard} color='error'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DiscardConfirm
