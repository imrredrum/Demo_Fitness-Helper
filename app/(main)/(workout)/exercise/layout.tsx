'use client'

import useExercise from '@/domain/Exercise/store'
import useWorkout from '@/domain/WorkoutSession/store'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const ExerciseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const exId = useSearchParams().get('eid') ?? ''
  const hasHydrated = useWorkout(s => s._hasHydrated)
  const exercise = useExercise(exId)
  const { replace } = useRouter()

  useEffect(() => {
    if (hasHydrated && !exercise) replace('/')
  }, [exercise, replace, hasHydrated])

  return children
}

export default ExerciseLayout
