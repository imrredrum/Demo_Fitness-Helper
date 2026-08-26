import type {
  ExerciseSet,
  ExerciseTypeWeight,
  ExerciseSetTypeWeight,
  ExerciseTypeTime,
  ExerciseSetTypeTime,
} from '../Exercise/schema'
import type { WorkoutSession } from '../WorkoutSession/schema'

export type ExerciseSetTypeWeightRecord = Required<ExerciseSetTypeWeight>
export type ExerciseSetTypeTimeRecord = Required<ExerciseSetTypeTime>
export type ExerciseSetRecord = Required<ExerciseSet>

export type ExerciseTypeWeightRecord = Required<
  Omit<ExerciseTypeWeight, 'sets'>
> & {
  sets: ExerciseSetTypeWeightRecord[]
}

export type ExerciseTypeTimeRecord = Required<
  Omit<ExerciseTypeTime, 'sets'>
> & {
  sets: ExerciseSetTypeTimeRecord[]
}

export type ExerciseRecord = ExerciseTypeWeightRecord | ExerciseTypeTimeRecord

export type WorkoutRecord = Required<
  Omit<WorkoutSession, 'exercise' | 'currentSetId'>
> & {
  id: string
  exercise: ExerciseRecord[]
}
