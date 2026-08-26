import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import type { ExerciseCategory } from './schema'

export type ExerciseCategoryStore = {
  _hasHydrated: boolean
  exCats: ExerciseCategory[]
}

const initExCatStore: ExerciseCategoryStore = {
  _hasHydrated: false,
  exCats: [],
}

const useExerciseCategory = create<ExerciseCategoryStore>()(
  persist(
    immer(() => initExCatStore),
    {
      name: 'exercise-category-storage',
      onRehydrateStorage: () => state => {
        if (!state) return
        state._hasHydrated = true
      },
    },
  ),
)

export default useExerciseCategory

export const setExerciseCategory = (exCats: ExerciseCategory[]) => {
  useExerciseCategory.setState(state => {
    state.exCats = exCats
  })
}

export const toggleExerciseCategoryDisplay = (
  categoryId: ExerciseCategory['id'],
) => {
  useExerciseCategory.setState(state => {
    const index = state.exCats.findIndex(category => category.id === categoryId)
    if (index === -1) return
    state.exCats[index].display = !state.exCats[index].display
  })
}

export const setExerciseCategoryRest = (
  categoryId: ExerciseCategory['id'],
  restInSeconds: ExerciseCategory['rest'],
) => {
  useExerciseCategory.setState(state => {
    const index = state.exCats.findIndex(category => category.id === categoryId)
    if (index === -1) return
    state.exCats[index].rest = restInSeconds
  })
}
