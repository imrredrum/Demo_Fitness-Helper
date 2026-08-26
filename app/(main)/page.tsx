'use client'

import useWorkout from '@/domain/WorkoutSession/store'
import GenericPage from './_GenericPage'
import WorkoutPage from './_WorkoutPage'
import { Box } from '@mui/material'

const MainPage: React.FC = () => {
  const workout = useWorkout(s => s)

  return !workout._hasHydrated ? (
    'Restoring Workout Session...'
  ) : workout.startedAt ? (
    <WorkoutPage />
  ) : (
    <GenericPage />
  )
}

export default MainPage
