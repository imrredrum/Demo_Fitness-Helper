import { EExerciseCategoryType } from '../ExerciseCategory/schema'
import useExerciseCategory from '../ExerciseCategory/store'
import useWorkout from '../WorkoutSession/store'
import type { Exercise } from './schema'

export type ExerciseStore = Exercise | null

const initialExerciseState: ExerciseStore = null

const useExercise = (exId: Exercise['id']) =>
  useWorkout(s => s.exercise.find(ex => ex.id === exId)) ?? initialExerciseState

export default useExercise

export const addExerciseSet = (exId: Exercise['id']) => {
  useWorkout.setState(state => {
    if (!state?.startedAt) return

    const exercise = state.exercise.find(ex => ex.id === exId)
    if (!exercise) return

    const exCat = useExerciseCategory
      .getState()
      .exCats.find(category => category.id === exercise.exCatId)
    if (!exCat) return

    switch (exercise.exerciseType) {
      case EExerciseCategoryType.WEIGHT:
        exercise.sets.push({
          id: crypto.randomUUID(),
          note: '',
          load: undefined,
          reps: undefined,
        })
        break
      case EExerciseCategoryType.TIME:
        exercise.sets.push({
          id: crypto.randomUUID(),
          note: '',
          durationInSeconds: undefined,
        })
        break
      default:
        break
    }
  })
}

export const updateExerciseSet = (
  exId: Exercise['id'],
  exSetId: Exercise['sets'][number]['id'],
  newState: Partial<Exercise['sets'][number]>,
) => {
  useWorkout.setState(state => {
    if (!state?.startedAt) return

    const exercise = state.exercise.find(ex => ex.id === exId)
    if (!exercise) return

    const exSet = exercise.sets.find(s => s.id === exSetId)
    if (!exSet) {
      exercise.sets.push({
        id: exSetId,
        ...newState,
      } as Exercise['sets'][number])
    } else {
      Object.assign(exSet, newState)
    }
  })
}

export const removeExerciseSet = (
  exId: Exercise['id'],
  exSetId: Exercise['sets'][number]['id'],
) => {
  useWorkout.setState(state => {
    if (state.currentSetId === exSetId) state.currentSetId = null
    if (!state?.startedAt) return

    const exercise = state.exercise.find(ex => ex.id === exId)
    if (!exercise) return

    const setIndex = exercise.sets.findIndex(s => s.id === exSetId)
    if (setIndex === -1) return

    exercise.sets.splice(setIndex, 1)
  })
}

export const startExerciseSet = (
  exId: Exercise['id'],
  exSetId: Exercise['sets'][number]['id'],
) => {
  useWorkout.setState(state => {
    if (!state?.startedAt) return

    const exercise = state.exercise.find(ex => ex.id === exId)
    if (!exercise) return

    const exSet = exercise.sets.find(s => s.id === exSetId)
    if (!exSet) return

    exSet.startedAt = new Date()
    state.currentSetId = exSetId
  })
}

export const finishExerciseSet = (
  exId: Exercise['id'],
  exSetId: Exercise['sets'][number]['id'],
) => {
  useWorkout.setState(state => {
    if (!state?.startedAt) return

    const exercise = state.exercise.find(ex => ex.id === exId)
    if (!exercise) return

    const exSet = exercise.sets.find(s => s.id === exSetId)
    if (!exSet || !exSet.startedAt) return

    exSet.finishedAt = new Date()
    state.currentSetId = null
  })
}
