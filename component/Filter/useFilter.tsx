'use client'

import { useState } from 'react'

const useFilter = () => {
  const [filter, setFilter] = useState<
    Record<'bodyPart' | 'equipment', string[]>
  >({
    bodyPart: [],
    equipment: [],
  })

  const handleFilterChange = (
    target: 'bodyPart' | 'equipment',
    value: string[],
  ) => {
    setFilter(prev => ({
      ...prev,
      [target]: value,
    }))
  }

  return { filter, handleFilterChange }
}

export default useFilter
