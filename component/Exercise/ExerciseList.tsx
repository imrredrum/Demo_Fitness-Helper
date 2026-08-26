'use client'

import useWorkout from '@/domain/WorkoutSession/store'
import { IconButton, Stack } from '@mui/material'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'
import RemoveConfirm from './RemoveConfirm'
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded'
import ExerciseCard from './ExerciseCard'
import Link from 'next/link'

const ExerciseList: React.FC = () => {
  const exercise = useWorkout(s => s.exercise)

  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{
        width: 1 / 1,
        overflow: 'auto',
        flex: '1 1 auto',
        '> *': { flexShrink: 0 },
      }}
    >
      {exercise.map(ex => (
        <ExerciseCard
          key={ex.id}
          {...ex}
          actions={[
            <RemoveConfirm key='remove' exId={ex.id}>
              <IconButton>
                <RemoveCircleRoundedIcon />
              </IconButton>
            </RemoveConfirm>,
            <IconButton
              key='exercise'
              LinkComponent={Link}
              href={`/exercise?eid=${ex.id}`}
            >
              <PlayCircleRoundedIcon />
            </IconButton>,
          ]}
        />
      ))}
    </Stack>
  )
}

export default ExerciseList
