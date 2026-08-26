'use client'

import { startWorkout } from '@/domain/WorkoutSession/store'
import {
  SettingsRounded as SettingsRoundedIcon,
  HistoryEduRounded as HistoryEduRoundedIcon,
  FitnessCenterRounded as FitnessCenterRoundedIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { SettingDialog } from '@/component/Settings'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import { SNACK_BAR_DURATION } from '@/config'

const GenericPage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const handlePunchIn = () => {
    startWorkout()
    enqueueSnackbar(
      <Stack direction='row' sx={{ alignItems: 'center' }}>
        <Typography> 開始今日訓練！</Typography>
        <FitnessCenterRoundedIcon fontSize='inherit' />
        <FitnessCenterRoundedIcon fontSize='inherit' />
        <FitnessCenterRoundedIcon fontSize='inherit' />
      </Stack>,
      {
        variant: 'success',
        autoHideDuration: SNACK_BAR_DURATION.long,
        hideIconVariant: true,
      },
    )
  }

  return (
    <Container
      maxWidth='xs'
      component='main'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        pb: 20,
      }}
    >
      <Avatar sx={{ width: 160, height: 160 }} />
      <Box />
      <Divider variant='middle' flexItem />
      <Typography variant='subtitle2'>準備開始今天的訓練</Typography>
      <Button
        variant='contained'
        disableElevation
        size='large'
        fullWidth
        onClick={handlePunchIn}
      >
        Punch In
      </Button>
      <Stack direction='row' spacing={2} sx={{ width: 1 / 1 }}>
        <SettingDialog>
          <Button
            variant='outlined'
            color='inherit'
            startIcon={<SettingsRoundedIcon />}
            fullWidth
          >
            Settings
          </Button>
        </SettingDialog>
        <Button
          variant='outlined'
          color='inherit'
          startIcon={<HistoryEduRoundedIcon />}
          fullWidth
          LinkComponent={Link}
          href='/history'
        >
          History
        </Button>
      </Stack>
    </Container>
  )
}

export default GenericPage
