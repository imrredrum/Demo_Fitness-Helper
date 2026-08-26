'use client'

import useFilter from '../Filter'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material'
import { BodyPartFilter, EquipmentFilter } from '../Filter'
import useExerciseCategory, {
  setExerciseCategoryRest,
} from '@/domain/ExerciseCategory/store'

const RestSetting: React.FC = () => {
  const exCats = useExerciseCategory(s => s.exCats)
  const { filter, handleFilterChange } = useFilter()

  const handleRestChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (Number(e.target.value) < 1) return
      setExerciseCategoryRest(id, Number(e.target.value))
    }

  return (
    <Stack direction='column' spacing={2}>
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
      <Divider flexItem />
      <List disablePadding>
        {exCats
          .filter(
            cat =>
              cat.display &&
              (!filter.bodyPart.length ||
                filter.bodyPart.includes(cat.bodyPart)) &&
              (!filter.equipment.length ||
                filter.equipment.includes(cat.equipment)),
          )
          .map(cat => (
            <ListItem key={cat.id} disableGutters>
              <ListItemText primary={cat.name} />
              <TextField
                type='number'
                value={cat.rest}
                onChange={handleRestChange(cat.id)}
                slotProps={{ htmlInput: { min: 0, step: 1 } }}
              />
            </ListItem>
          ))}
      </List>
    </Stack>
  )
}

export default RestSetting
