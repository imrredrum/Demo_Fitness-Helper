'use client'

import { useSearchParams } from 'next/navigation'
import useExercise from '@/domain/Exercise/store'
import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { getExerciseCategory } from '@/domain/ExerciseCategory/utils'
import { SetList } from '@/component/Set'
import Link from 'next/link'

const ExercisePage: React.FC = () => {
  const exId = useSearchParams().get('eid') ?? ''
  const exercise = useExercise(exId)
  const exCat = getExerciseCategory(exercise?.exCatId ?? '')

  return (
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
      <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
        <IconButton component={Link} href='/' aria-label='back'>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Typography variant='h4' component='h1' sx={{ flex: '1 1 auto' }}>
          {exCat?.name}
        </Typography>
      </Stack>
      <Box sx={{ flexShrink: 1, flexGrow: 1, overflowY: 'auto' }}>
        <SetList exerciseId={exId} />
      </Box>
    </Container>
  )
}

export default ExercisePage
