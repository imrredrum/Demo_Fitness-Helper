import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { removeExercise } from '@/domain/WorkoutSession/store'
import { Exercise } from '@/domain/Exercise/schema'

type RemoveConfirmProps = {
  exId: Exercise['id']
}

const RemoveConfirm: React.FC<React.PropsWithChildren<RemoveConfirmProps>> = ({
  children,
  exId,
}) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRemove = () => {
    removeExercise(exId)
    handleClose()
  }

  return (
    <>
      <Box onClick={handleOpen} sx={{ display: 'contents' }}>
        {children}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove Exercise</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this exercise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemove} color='error'>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default RemoveConfirm
