import type { ExerciseCategory } from './schema'
import useExerciseCategory from './store'

export const getExerciseCategory = (
  exCatId: string,
): ExerciseCategory | undefined =>
  useExerciseCategory.getState().exCats.find(cat => cat.id === exCatId)
