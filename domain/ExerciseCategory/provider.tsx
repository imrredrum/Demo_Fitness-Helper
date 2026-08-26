'use client'

import { useEffect } from 'react'
import useExerciseCategory, { setExerciseCategory } from './store'
import { MOCK_EXERCISE_CATEGORIES } from '@/mock/data'

const ExerciseCategoryProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { exCats, _hasHydrated } = useExerciseCategory(s => s)

  useEffect(() => {
    if (!_hasHydrated || !!exCats.length) return
    setExerciseCategory(MOCK_EXERCISE_CATEGORIES)
  }, [exCats, _hasHydrated])

  return <>{children}</>
}

export default ExerciseCategoryProvider
