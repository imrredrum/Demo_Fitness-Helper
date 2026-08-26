import type { Exercise } from '@/domain/Exercise/schema'
import { EExerciseCategoryType } from '@/domain/ExerciseCategory/schema'
import type { ExerciseRecord } from '@/domain/Record/schema'

const cleanupExerciseRecord: (
  exercises: Exercise[],
) => ExerciseRecord[] = exercises => {
  return exercises
    .map(exercise => {
      const cleanedSets = exercise.sets
        .filter(set => set.startedAt && set.finishedAt)
        .filter(set => {
          switch (exercise.exerciseType) {
            case EExerciseCategoryType.WEIGHT:
              return 'load' in set && 'reps' in set && !!set.load && !!set.reps
            case EExerciseCategoryType.TIME:
              return 'durationInSeconds' in set && !!set.durationInSeconds
            default:
              return false
          }
        })

      return {
        ...exercise,
        sets: cleanedSets,
      } as ExerciseRecord
    })
    .filter(exercise => exercise.sets.length > 0)
}

export default cleanupExerciseRecord
