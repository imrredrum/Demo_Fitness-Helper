import useExerciseCategory from '@/domain/ExerciseCategory/store'
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  type DialogProps,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
  TextField,
  Divider,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import useFilter, { BodyPartFilter, EquipmentFilter } from '../Filter'
import {
  EExerciseCategoryType,
  ELoadUnit,
} from '@/domain/ExerciseCategory/schema'
import type {
  Exercise,
  ExerciseSetTypeWeight,
  ExerciseSetTypeTime,
} from '@/domain/Exercise/schema'
import { AddRounded as AddRoundedIcon } from '@mui/icons-material'
import { addExercise, updateExercise } from '@/domain/WorkoutSession/store'

type SetFieldsProps = {
  index: number
  onChange: (sets: Exercise['sets']) => void
  unit: ELoadUnit
} & (
  | {
      type: EExerciseCategoryType.WEIGHT
      set: ExerciseSetTypeWeight
    }
  | {
      type: EExerciseCategoryType.TIME
      set: ExerciseSetTypeTime
    }
)

const SetFields: React.FC<SetFieldsProps> = ({
  index,
  type,
  unit,
  set,
  onChange,
}) => {
  const handleChange = (field: string, value: unknown) => {
    onChange([{ ...set, [field]: value }])
  }

  return (
    <Stack
      direction='row'
      spacing={2}
      sx={{ width: 1 / 1, alignItems: 'center', '> *': { flex: '1 1 auto' } }}
    >
      <Typography sx={{ flex: '0 0 auto' }}># {index + 1}</Typography>
      {type === EExerciseCategoryType.WEIGHT ? (
        <>
          <TextField
            type='number'
            label={`Load (${unit})`}
            value={set.load}
            onChange={e => handleChange('load', Number(e.target.value))}
            size='small'
            slotProps={{
              htmlInput: {
                min: 0,
                step: 1,
              },
            }}
          />
          <TextField
            type='number'
            label='Reps'
            value={set.reps}
            onChange={e => handleChange('reps', Number(e.target.value))}
            size='small'
            slotProps={{
              htmlInput: {
                min: 0,
                step: 1,
              },
            }}
          />
        </>
      ) : type === EExerciseCategoryType.TIME ? (
        <TextField
          type='number'
          label='Duration (seconds)'
          value={set.durationInSeconds}
          onChange={e =>
            handleChange('durationInSeconds', Number(e.target.value))
          }
          size='small'
          slotProps={{
            htmlInput: {
              min: 0,
              step: 1,
            },
          }}
        />
      ) : null}
    </Stack>
  )
}

type ExerciseFields = {
  exCatId?: Exercise['id']
  sets?: Exercise['sets']
}

const ExerciseDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const theme = useTheme()
  const [draft, setDraft] = useState<ExerciseFields>({})

  const handleClose = () => {
    onClose?.({}, 'backdropClick')
    setTimeout(() => setDraft({}), theme.transitions.duration.leavingScreen)
  }

  const { filter, handleFilterChange } = useFilter()

  const exCats = useExerciseCategory(s => s.exCats).filter(
    exCat =>
      exCat.display &&
      (!filter.bodyPart.length || filter.bodyPart.includes(exCat.bodyPart)) &&
      (!filter.equipment.length || filter.equipment.includes(exCat.equipment)),
  )

  const handleAddSet = () => {
    setDraft(prev => {
      const sets = prev.sets ? [...prev.sets] : []
      const newSet = {
        id: crypto.randomUUID(),
        note: '',
        ...(exCats.find(exCat => exCat.id === prev.exCatId)?.type ===
        EExerciseCategoryType.WEIGHT
          ? { load: undefined, reps: undefined }
          : { durationInSeconds: undefined }),
      }
      return { ...prev, sets: [...sets, newSet] }
    })
  }

  const handleSetChange =
    (set: NonNullable<ExerciseFields['sets']>[number], index: number) => () => {
      setDraft(prev => {
        const sets = prev.sets ? [...prev.sets] : []
        sets[index] = set
        return { ...prev, sets }
      })
    }

  const handleSubmit = () => {
    if (!draft.exCatId) return
    const exId = crypto.randomUUID()
    addExercise(draft.exCatId, exId)
    updateExercise(exId, { sets: draft.sets ?? [] })
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
      <DialogTitle>Add Exercise</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <DialogContentText>
          Please fill out the form below to add a new exercise.
        </DialogContentText>
        <Stack direction='row' spacing={2}>
          <BodyPartFilter
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
          <EquipmentFilter
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
        </Stack>
        <FormControl fullWidth required>
          <InputLabel id='exercise-select-label'>Exercise</InputLabel>
          <Select
            labelId='exercise-select-label'
            id='exercise-select'
            label='Exercise'
            name='exercise'
            value={draft.exCatId ?? ''}
            onChange={e => setDraft({ exCatId: e.target.value, sets: [] })}
            required
          >
            {!exCats.length && (
              <MenuItem disabled>No exercises available</MenuItem>
            )}
            {exCats.map(exCat => (
              <MenuItem key={exCat.id} value={exCat.id}>
                {exCat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider flexItem />
        {draft.sets?.map((set, index) => {
          const currentExCat = exCats.find(exCat => exCat.id === draft.exCatId)
          const type = currentExCat?.type ?? EExerciseCategoryType.WEIGHT
          const unit =
            currentExCat?.type === EExerciseCategoryType.WEIGHT
              ? currentExCat.loadUnit
              : ELoadUnit.KG
          return (
            <SetFields
              key={index}
              index={index}
              type={type}
              unit={unit}
              set={set}
              onChange={handleSetChange(set, index)}
            />
          )
        })}
        <Button
          variant='outlined'
          disabled={!draft.exCatId}
          onClick={handleAddSet}
          sx={{ borderStyle: 'dashed' }}
          startIcon={<AddRoundedIcon />}
          fullWidth
        >
          Add Set
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type='submit' onClick={handleSubmit} disabled={!draft.exCatId}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const AddExercise: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'contents' }} onClick={handleOpen}>
        {children}
      </Box>
      <ExerciseDialog open={open} onClose={handleClose} />
    </>
  )
}

export default AddExercise
