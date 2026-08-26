'use client'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from '@mui/material'
import type { FilterProps } from '.'
import useExerciseCategory from '@/domain/ExerciseCategory/store'

const BodyPartFilter: React.FC<FilterProps> = ({
  filter,
  handleFilterChange,
}) => {
  const exCats = useExerciseCategory(s => s.exCats)
  const options = Array.from(new Set(exCats.map(cat => cat.bodyPart)))

  const handleChange = (event: SelectChangeEvent<typeof filter.bodyPart>) => {
    handleFilterChange('bodyPart', event.target.value as string[])
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='body-part-select-label'>部位</InputLabel>
      <Select
        name='bodyPart'
        labelId='body-part-select-label'
        id='body-part-select'
        value={filter.bodyPart}
        label='部位'
        onChange={handleChange}
        multiple
      >
        {options.map(bodyPart => (
          <MenuItem key={bodyPart} value={bodyPart}>
            {bodyPart}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default BodyPartFilter
