'use client'

import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import CustomTabs from '../CustomTabs'
import DisplaySetting from './DisplaySetting'
import RestSetting from './RestSetting'

const SettingDialog: React.FC<React.PropsWithChildren> = ({ children }) => {
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
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xs'
        fullWidth
        slotProps={{ paper: { sx: { minHeight: '80%' } } }}
      >
        <DialogTitle>Settings</DialogTitle>
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <CustomTabs
            tabs={[
              {
                label: '動作顯示',
                panel: <DisplaySetting />,
              },
              {
                label: '組間休息 (秒)',
                panel: <RestSetting />,
              },
            ]}
            slotProps={{
              tabList: {
                variant: 'fullWidth',
                sx: { borderBottom: 1, borderColor: 'divider' },
              },
              tabPanel: {
                sx: { p: 2 },
              },
            }}
          />
        </Box>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SettingDialog
