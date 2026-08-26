'use client'

import type { Exercise } from '@/domain/Exercise/schema'
import useExercise, { addExerciseSet } from '@/domain/Exercise/store'
import { Stack, Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SetCard from './SetCard'

type SetListProps = {
  exerciseId: Exercise['id']
}

const SetList: React.FC<SetListProps> = ({ exerciseId }) => {
  const setIds = useExercise(exerciseId)?.sets.map(s => s.id) ?? []

  const handleAddSet = () => {
    addExerciseSet(exerciseId)
  }

  return (
    <Stack direction='column' spacing={2} sx={{ width: 1 / 1 }}>
      {setIds.length === 0 && <p>No sets available.</p>}
      {setIds.map(setId => (
        <SetCard key={setId} exerciseId={exerciseId} setId={setId} />
      ))}
      <Button
        size='large'
        variant='outlined'
        onClick={handleAddSet}
        sx={{ borderStyle: 'dashed' }}
        startIcon={<AddRoundedIcon />}
        fullWidth
      >
        Add Set
      </Button>
    </Stack>
  )
}
export default SetList
