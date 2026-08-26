import useExerciseCategory from '@/domain/ExerciseCategory/store'
import type { FilterProps } from '.'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material'

const EquipmentFilter: React.FC<FilterProps> = ({
  filter,
  handleFilterChange,
}) => {
  const exCats = useExerciseCategory(s => s.exCats)
  const options = {
    equipment: Array.from(new Set(exCats.map(cat => cat.equipment))),
  }

  const handleChange = (event: SelectChangeEvent<typeof filter.equipment>) => {
    handleFilterChange('equipment', event.target.value as string[])
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='equipment-select-label'>器材</InputLabel>
      <Select
        labelId='equipment-select-label'
        id='equipment-select'
        value={filter.equipment}
        name='equipment'
        label='器具'
        onChange={handleChange}
        multiple
      >
        {options.equipment.map(equipment => (
          <MenuItem key={equipment} value={equipment}>
            {equipment}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default EquipmentFilter
