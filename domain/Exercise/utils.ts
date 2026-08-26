import useWorkout from '../WorkoutSession/store'

export const getNextExerciseById = (exId: string) => {
  const currentIndex = useWorkout
    .getState()
    .exercise.findIndex(ex => ex.id === exId)
  if (currentIndex < 0) return null
  return useWorkout.getState().exercise[currentIndex + 1] ?? null
}

export const getNextExerciseSetById = (exId: string, exSetId: string) => {
  const exercise = useWorkout.getState().exercise.find(ex => ex.id === exId)
  if (!exercise) return null
  const currentIndex = exercise.sets.findIndex(s => s.id === exSetId)
  if (currentIndex < 0) return null
  return exercise.sets[currentIndex + 1] ?? null
}
