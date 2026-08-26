'use client'

import useWorkout from '@/domain/WorkoutSession/store'
import { Summary } from '../Summary'
import { cleanupExerciseRecord } from '@/domain/share/utils'

const WorkoutSummary: React.FC = () => {
  const workout = useWorkout(s => s)

  if (!workout || !workout.startedAt) {
    return <div>No workout data available.</div>
  }

  return (
    <Summary
      workout={{
        id: 'current',
        startedAt: workout.startedAt,
        finishedAt: new Date(),
        exercise: cleanupExerciseRecord(workout.exercise),
        note: workout.note,
      }}
    />
  )
}

export default WorkoutSummary
