import type { Exercise } from '../Exercise/schema'

export type WorkoutSession = {
  startedAt?: Date
  finishedAt?: Date
  note: string
  exercise: Exercise[]
  currentSetId: Exercise['sets'][number]['id'] | null
}
