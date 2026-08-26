import type {
  ExerciseCategory,
  ExerciseCategoryByTime,
  ExerciseCategoryByWeight,
} from '../ExerciseCategory/schema'

type ExerciseSetBase = {
  id: string
  startedAt?: Date
  finishedAt?: Date
  note: string
}

export type ExerciseSetTypeWeight = ExerciseSetBase & {
  load?: number
  reps?: number
}

export type ExerciseSetTypeTime = ExerciseSetBase & {
  durationInSeconds?: number
}

export type ExerciseSet = ExerciseSetTypeWeight | ExerciseSetTypeTime

type ExerciseBase = {
  id: string
  // startedAt?: Date
  // finishedAt?: Date
  exCatId: ExerciseCategory['id']
  note: string
}

export type ExerciseTypeWeight = ExerciseBase & {
  exerciseType: ExerciseCategoryByWeight['type']
  sets: ExerciseSetTypeWeight[]
}

export type ExerciseTypeTime = ExerciseBase & {
  exerciseType: ExerciseCategoryByTime['type']
  sets: ExerciseSetTypeTime[]
}

export type Exercise = ExerciseTypeWeight | ExerciseTypeTime
