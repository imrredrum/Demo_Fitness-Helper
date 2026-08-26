'use client'

import ExerciseSummary from './ExerciseSummary'
import type { WorkoutRecord } from '@/domain/Record/schema'
import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  Typography,
  Stack,
  Divider,
  CardActionArea,
} from '@mui/material'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import TimerRoundedIcon from '@mui/icons-material/TimerRounded'
import { EExerciseCategoryType } from '@/domain/ExerciseCategory/schema'
import { getExerciseCategory } from '@/domain/ExerciseCategory/utils'
import { calculateDuration } from '@/domain/share/utils'

type SummaryProps = {
  workout: WorkoutRecord
}

const Summary: React.FC<SummaryProps> = ({ workout }) => {
  return workout.exercise.length === 0 ? (
    <Typography variant='caption' color='textDisabled'>
      <em>No exercises found for this workout.</em>
    </Typography>
  ) : (
    <Grid
      container
      spacing={2}
      sx={{ width: 1 / 1, overflow: 'auto', flex: '1 1 auto' }}
    >
      {workout.exercise.map(exercise => (
        <Grid size={{ xs: 12, sm: 6 }} key={exercise.id}>
          <Card elevation={0} sx={{ borderRadius: 2 }}>
            <ExerciseSummary exercise={exercise}>
              <CardActionArea>
                <CardHeader
                  {...(exercise.exerciseType ===
                    EExerciseCategoryType.WEIGHT && {
                    avatar: <FitnessCenterRoundedIcon color='success' />,
                  })}
                  {...(exercise.exerciseType === EExerciseCategoryType.TIME && {
                    avatar: <TimerRoundedIcon color='success' />,
                  })}
                  title={getExerciseCategory(exercise.exCatId)?.name}
                  subheader={
                    <Stack
                      direction='row'
                      spacing={1}
                      sx={{
                        alignItems: 'center',
                        overflow: 'auto',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Typography variant='inherit'>
                        {getExerciseCategory(exercise.exCatId)?.bodyPart}
                      </Typography>
                      <Divider orientation='vertical' flexItem />
                      <Typography variant='inherit'>
                        {getExerciseCategory(exercise.exCatId)?.equipment}
                      </Typography>
                      <Divider orientation='vertical' flexItem />
                      {exercise.exerciseType ===
                        EExerciseCategoryType.WEIGHT && (
                        <Typography variant='inherit'>
                          {exercise.sets.length} 組
                        </Typography>
                      )}
                      {exercise.exerciseType === EExerciseCategoryType.TIME && (
                        <Typography variant='inherit'>
                          {calculateDuration(exercise.sets).formatted}
                        </Typography>
                      )}
                    </Stack>
                  }
                  slotProps={{
                    title: {
                      variant: 'h6',
                      fontWeight: 600,
                    },
                    content: {
                      sx: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      },
                    },
                  }}
                />
                {!!exercise.note && (
                  <CardContent sx={{ pt: 0 }}>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{
                        borderStyle: 'dashed',
                        borderColor: 'divider',
                        borderWidth: 1,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                      }}
                    >
                      備註：{exercise.note}
                    </Typography>
                  </CardContent>
                )}
              </CardActionArea>
            </ExerciseSummary>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Summary
