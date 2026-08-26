'use client'

import type {
  Exercise,
  ExerciseSetTypeWeight,
  ExerciseSetTypeTime,
} from '@/domain/Exercise/schema'
import useExercise, {
  removeExerciseSet,
  startExerciseSet,
  updateExerciseSet,
  finishExerciseSet,
} from '@/domain/Exercise/store'
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import {
  Card,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { EExerciseCategoryType } from '@/domain/ExerciseCategory/schema'
import { SetWeightInput, SetTimeInput } from './SetInput'
import NoteDialog from './NoteDialog'
import useWorkout from '@/domain/WorkoutSession/store'
import { useEffect, useRef, useCallback } from 'react'
import { startRestSession } from '@/domain/RestSession/store'
import dayjs from 'dayjs'
import useExerciseCategory from '@/domain/ExerciseCategory/store'

type SetCardProps = {
  exerciseId: Exercise['id']
  setId: Exercise['sets'][number]['id']
}

const SetCard: React.FC<SetCardProps> = ({ exerciseId, setId }) => {
  const ref = useRef<HTMLDivElement>(null)
  const currentSetId = useWorkout(s => s.currentSetId)
  const exercise = useExercise(exerciseId)
  const exCatRest = useExerciseCategory(
    s => s.exCats.find(cat => cat.id === exercise?.exCatId)?.rest,
  )

  useEffect(() => {
    if (currentSetId === setId) {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentSetId, setId])

  const handleFinishSet = useCallback(() => {
    finishExerciseSet(exerciseId, setId)
    if (exCatRest === undefined || exCatRest <= 0) return
    startRestSession(
      exerciseId,
      setId,
      dayjs().add(exCatRest, 'second').toDate(),
    )
  }, [exerciseId, setId, exCatRest])

  if (!exercise) return null

  const setIndex = exercise.sets.findIndex(s => s.id === setId)
  const set = exercise.sets[setIndex ?? -1]

  if (!set) return null

  const type = exercise.exerciseType

  const handleDuplicateSet = () => {
    const newSet = {
      ...set,
      id: crypto.randomUUID(),
      startedAt: undefined,
      finishedAt: undefined,
      note: '',
    }
    updateExerciseSet(exerciseId, newSet.id, newSet)
  }

  const handleRemoveSet = () => {
    removeExerciseSet(exerciseId, setId)
  }

  const started = Boolean(set.startedAt)
  const finished = Boolean(set.finishedAt)

  const handleStartSet = () => {
    startExerciseSet(exerciseId, setId)
  }

  const validated =
    type === EExerciseCategoryType.WEIGHT
      ? Boolean((set as ExerciseSetTypeWeight).load) &&
        Boolean((set as ExerciseSetTypeWeight).reps)
      : type === EExerciseCategoryType.TIME
        ? Boolean((set as ExerciseSetTypeTime).durationInSeconds)
        : false

  return (
    <Card
      ref={ref}
      sx={{
        width: 1 / 1,
        borderRadius: 2,
        boxShadow: 'none',
        ...(started &&
          !finished && {
            border: theme => `1px solid ${theme.palette.primary.main}`,
          }),
      }}
    >
      <CardHeader
        title={
          <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
            {finished && <DoneAllRoundedIcon color='success' />}
            <Typography variant='inherit'>
              Set #{setIndex !== undefined ? setIndex + 1 : ''}
            </Typography>
          </Stack>
        }
        action={[
          <NoteDialog key='note' exerciseId={exerciseId} setId={setId}>
            <IconButton title='Edit Note' aria-label='edit note'>
              <EditNoteRoundedIcon />
            </IconButton>
          </NoteDialog>,
          <IconButton
            key='copy'
            title='Copy Set'
            aria-label='copy set'
            onClick={handleDuplicateSet}
          >
            <ContentCopyRoundedIcon />
          </IconButton>,
          <IconButton
            key='remove'
            title='Remove Set'
            aria-label='remove set'
            onClick={handleRemoveSet}
          >
            <DeleteRoundedIcon />
          </IconButton>,
        ]}
      />
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          {type === EExerciseCategoryType.WEIGHT && (
            <SetWeightInput exerciseId={exerciseId} setId={setId} />
          )}
          {type === EExerciseCategoryType.TIME && (
            <SetTimeInput
              exerciseId={exerciseId}
              setId={setId}
              onFinish={handleFinishSet}
            />
          )}
          {!finished && (
            <Stack direction='row' spacing={{ xs: 4, sm: 2 }}>
              <Fab
                variant='circular'
                title='Start Set'
                aria-label='start set'
                color='primary'
                disabled={
                  !validated || started || finished || currentSetId !== null
                }
                onClick={handleStartSet}
              >
                <PlayArrowRoundedIcon />
              </Fab>
              <Fab
                variant='circular'
                title='Finish Set'
                aria-label='finish set'
                color='primary'
                disabled={!validated || !started || finished}
                onClick={handleFinishSet}
              >
                <StopRoundedIcon />
              </Fab>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SetCard
