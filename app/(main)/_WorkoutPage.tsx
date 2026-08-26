import {
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
} from '@mui/material'
import { DiscardConfirm, NoteAndSave } from '@/component/Workout'
import { ExerciseList, AddExercise } from '@/component/Exercise'
import {
  AddBoxRounded as AddBoxRoundedIcon,
  SettingsRounded as SettingsRoundedIcon,
  DeleteForeverRounded as DeleteForeverRoundedIcon,
  CheckCircleRounded as CheckCircleRoundedIcon,
} from '@mui/icons-material'
import { SettingDialog } from '@/component/Settings'

const WorkoutPage: React.FC = () => (
  <Container
    maxWidth='md'
    component='main'
    sx={{
      height: 'stretch',
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 2,
      py: 4,
    }}
  >
    <Stack
      direction='row'
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant='h4' component='h1' sx={{ flex: '1 1 auto' }}>
        Workout
      </Typography>
      <AddExercise>
        <IconButton size='small' color='primary' aria-label='add exercise'>
          <AddBoxRoundedIcon fontSize='small' />
        </IconButton>
      </AddExercise>
      <Divider orientation='vertical' variant='middle' flexItem />
      <DiscardConfirm>
        <IconButton size='small' color='error' aria-label='discard workout'>
          <DeleteForeverRoundedIcon fontSize='small' />
        </IconButton>
      </DiscardConfirm>
      <SettingDialog>
        <IconButton size='small' color='default' aria-label='settings'>
          <SettingsRoundedIcon fontSize='small' />
        </IconButton>
      </SettingDialog>
      <Divider orientation='vertical' variant='middle' flexItem />
      <NoteAndSave>
        <IconButton size='small' color='success' aria-label='finish workout'>
          <CheckCircleRoundedIcon fontSize='small' />
        </IconButton>
      </NoteAndSave>
    </Stack>
    <ExerciseList />
  </Container>
)

export default WorkoutPage
