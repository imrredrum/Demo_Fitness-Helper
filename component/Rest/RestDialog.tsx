'use client'

import { Dialog, Fade } from '@mui/material'
import { forwardRef } from 'react'
import type { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />
})

const RestDialog: React.FC<
  React.PropsWithChildren<{ open: boolean; handleClose: () => void }>
> = ({ open, handleClose, children }) => {
  const handleCloseDialog = (_event: object, reason: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return
    handleClose()
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseDialog}
      slots={{
        transition: Transition,
      }}
    >
      {children}
    </Dialog>
  )
}

export default RestDialog
