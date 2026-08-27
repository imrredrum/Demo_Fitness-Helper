'use client'

import useWorkout from '@/domain/WorkoutSession/store'
import { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useRest from '@/domain/RestSession/store'
import RestBetweenSets from '@/component/Rest'

const WorkoutLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const workout = useWorkout(s => s)
  const restHydrated = useRest(s => s._hasHydrated)
  const { replace } = useRouter()

  useEffect(() => {
    if (!workout._hasHydrated || workout.startedAt) return
    replace('/')
  }, [workout, replace])

  return (
    <Suspense fallback={null}>
      {children}
      {restHydrated && <RestBetweenSets />}
    </Suspense>
  )
}

export default WorkoutLayout
