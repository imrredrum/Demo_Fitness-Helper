export type ExerciseCategoryBase = {
  id: string
  name: string
  description?: string

  bodyPart: string
  equipment: string

  display: boolean
  rest: number
}

export enum EExerciseCategoryType {
  WEIGHT = 'weight',
  TIME = 'time',
}

export enum ELoadUnit {
  KG = 'kg',
  LB = 'lb',
}

export type ExerciseCategoryByWeight = ExerciseCategoryBase & {
  type: EExerciseCategoryType.WEIGHT
  loadUnit: ELoadUnit
}

export type ExerciseCategoryByTime = ExerciseCategoryBase & {
  type: EExerciseCategoryType.TIME
}

export type ExerciseCategory = ExerciseCategoryByWeight | ExerciseCategoryByTime
