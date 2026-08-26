'use client'
import { SNACK_BAR_DURATION } from '@/config'
import useFilter from '../Filter'
import {
  VisibilityOffRounded as VisibilityOffRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material'
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material'
import { BodyPartFilter, EquipmentFilter } from '../Filter'
import useExerciseCategory, {
  toggleExerciseCategoryDisplay,
} from '@/domain/ExerciseCategory/store'
import { useSnackbar } from 'notistack'

const DisplaySetting: React.FC = () => {
  const exCats = useExerciseCategory(s => s.exCats)
  const { filter, handleFilterChange } = useFilter()

  const { enqueueSnackbar } = useSnackbar()

  const handleToggleDisplay = (cat: (typeof exCats)[number]) => () => {
    toggleExerciseCategoryDisplay(cat.id)
    enqueueSnackbar(`已${cat.display ? '隱藏' : '顯示'}${cat.name}`, {
      variant: 'default',
      autoHideDuration: SNACK_BAR_DURATION.short,
      preventDuplicate: true,
    })
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
              (!filter.bodyPart.length ||
                filter.bodyPart.includes(cat.bodyPart)) &&
              (!filter.equipment.length ||
                filter.equipment.includes(cat.equipment)),
          )
          .map(cat => (
            <ListItem key={cat.id} disableGutters>
              <ListItemButton
                selected={cat.display}
                onClick={handleToggleDisplay(cat)}
                sx={{ borderRadius: 2 }}
              >
                <ListItemText primary={cat.name} />
                {cat.display ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Stack>
  )
}

export default DisplaySetting
