'use client'

import { useCallback } from 'react'
import { DialogTitle, DialogContent, Container } from '@mui/material'
import { useSnackbar } from 'notistack'
import useRest, { endRestSession } from '@/domain/RestSession/store'
import RestDialog from './RestDialog'
import Timer from './Timer'
import Note from './Note'

const RestBetweenSets: React.FC = () => {
  const open = useRest(s => Boolean(s.endTime))

  const { enqueueSnackbar } = useSnackbar()

  const handleClose = useCallback(() => {
    endRestSession()
  }, [])

  const handleFinish = useCallback(() => {
    handleClose()
    enqueueSnackbar('Time for another set!', { variant: 'info' })
  }, [handleClose, enqueueSnackbar])

  return (
    <RestDialog open={open} handleClose={handleClose}>
      <Container
        sx={{
          height: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <DialogTitle variant='h4'>Take a Break</DialogTitle>
        <Timer onFinish={handleFinish} />
        <DialogContent sx={{ flexGrow: 0, flexShrink: 0 }}>
          ...and write down your thoughts.
        </DialogContent>
        <Note />
      </Container>
    </RestDialog>
  )
}

export default RestBetweenSets
