import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { WorkoutSession } from './schema'
import { immer } from 'zustand/middleware/immer'
import useExerciseCategory from '../ExerciseCategory/store'
import { addRecord } from '../Record/store'
import { cleanupExerciseRecord } from '../share/utils'

export type WorkoutStore = WorkoutSession & {
  _hasHydrated: boolean
}

const initWorkout: WorkoutStore = {
  _hasHydrated: false,
  startedAt: undefined,
  finishedAt: undefined,
  note: '',
  exercise: [],
  currentSetId: null,
}

const useWorkout = create<WorkoutStore>()(
  persist(
    immer(() => initWorkout),
    {
      name: 'workout-session-storage',
      onRehydrateStorage: () => state => {
        if (!state) return
        state._hasHydrated = true
      },
    },
  ),
)

export default useWorkout

export const startWorkout = () => {
  useWorkout.setState(state => {
    state.startedAt = new Date()
  })
}

export const finishWorkout = () => {
  useWorkout.setState(state => {
    if (!state?.startedAt) return
    state.finishedAt = new Date()
    addRecord({
      startedAt: state.startedAt,
      finishedAt: state.finishedAt,
      note: state.note,
      exercise: cleanupExerciseRecord(state.exercise),
    })
  })
  resetWorkout()
}

export const resetWorkout = () => {
  useWorkout.setState({
    ...initWorkout,
    _hasHydrated: true,
  })
}

export const updateWorkout = (newState: Partial<WorkoutStore>) => {
  useWorkout.setState(state => {
    Object.assign(state, newState)
  })
}

export const addExercise = (
  exCatId: WorkoutStore['exercise'][number]['exCatId'],
  exId?: WorkoutStore['exercise'][number]['id'],
) => {
  const exCat = useExerciseCategory
    .getState()
    .exCats.find(category => category.id === exCatId)
  if (!exCat) return
  useWorkout.setState(state => {
    if (!state?.startedAt) return
    if (state.exercise.some(ex => ex.id === exId)) return
    state.exercise.push({
      id: exId ?? crypto.randomUUID(),
      exCatId: exCat.id,
      note: '',
      exerciseType: exCat.type,
      sets: [],
    })
  })
}

export const updateExercise = (
  exId: WorkoutStore['exercise'][number]['id'],
  newState: Partial<WorkoutStore['exercise'][number]>,
) => {
  useWorkout.setState(state => {
    if (!state?.startedAt) return
    const exercise = state.exercise.find(ex => ex.id === exId)
    if (!exercise) return
    Object.assign(exercise, newState)
  })
}

export const removeExercise = (
  exId: WorkoutStore['exercise'][number]['id'],
) => {
  useWorkout.setState(state => {
    if (!state?.startedAt) return
    if (
      state.exercise
        .find(ex => ex.id === exId)
        ?.sets.some(set => set.id === state.currentSetId)
    )
      state.currentSetId = null
    state.exercise = state.exercise.filter(exercise => exercise.id !== exId)
  })
}
