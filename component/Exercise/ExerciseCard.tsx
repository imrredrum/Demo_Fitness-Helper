import type { Exercise } from '@/domain/Exercise/schema'
import { EExerciseCategoryType } from '@/domain/ExerciseCategory/schema'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  type CardHeaderProps,
} from '@mui/material'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import TimerRoundedIcon from '@mui/icons-material/TimerRounded'
import { getExerciseCategory } from '@/domain/ExerciseCategory/utils'
import { calculateDuration } from '@/domain/share/utils'

type ExerciseCardProps = Pick<
  Exercise,
  'id' | 'exCatId' | 'exerciseType' | 'note' | 'sets'
> & {
  actions?: CardHeaderProps['action']
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exCatId,
  exerciseType,
  note,
  sets,
  actions,
}) => {
  return (
    <Card
      sx={{
        width: 1 / 1,
        borderRadius: 2,
        boxShadow: 'none',
        ...(Boolean(sets.length) &&
          !sets.some(set => !set.finishedAt) && {
            bgcolor: 'success.dark',
          }),
      }}
    >
      <CardHeader
        {...(exerciseType === EExerciseCategoryType.WEIGHT && {
          avatar: <FitnessCenterRoundedIcon fontSize='large' color='inherit' />,
        })}
        {...(exerciseType === EExerciseCategoryType.TIME && {
          avatar: <TimerRoundedIcon fontSize='large' color='inherit' />,
        })}
        title={getExerciseCategory(exCatId)?.name}
        subheader={
          !!sets.length ? (
            `預計組數：${sets.length} 組，已完成：${sets.filter(set => set.finishedAt).length} 組，耗時：${calculateDuration(sets).formatted}`
          ) : (
            <em>(尚未設定組數)</em>
          )
        }
        slotProps={{
          title: {
            variant: 'h6',
            fontWeight: 600,
          },
        }}
        action={actions}
      />
      {!!note && (
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
            備註：{note}
          </Typography>
        </CardContent>
      )}
    </Card>
  )
}

export default ExerciseCard
