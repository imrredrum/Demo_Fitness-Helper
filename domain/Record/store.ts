import { persist } from 'zustand/middleware'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { WorkoutRecord } from './schema'

export type RecordsStore = {
  _hasHydrated: boolean
  records: WorkoutRecord[]
}

const initRecords: RecordsStore = {
  _hasHydrated: false,
  records: [],
}

const useRecord = create<RecordsStore>()(
  persist(
    immer(() => initRecords),
    {
      name: 'records-storage',
      onRehydrateStorage: () => state => {
        if (!state) return
        state._hasHydrated = true
      },
    },
  ),
)

export default useRecord

export const addRecord = (workout: Omit<WorkoutRecord, 'id'>) => {
  const record = { ...workout, id: crypto.randomUUID() }
  useRecord.setState(state => {
    state.records.unshift(record)
  })
}

export const updateRecord = (
  recordId: WorkoutRecord['id'],
  newState: Partial<WorkoutRecord>,
) => {
  useRecord.setState(state => {
    const index = state.records.findIndex(record => record.id === recordId)
    if (index === -1) return
    state.records[index] = { ...state.records[index], ...newState }
  })
}

export const removeRecord = (recordId: WorkoutRecord['id']) => {
  useRecord.setState(state => {
    const index = state.records.findIndex(record => record.id === recordId)
    if (index === -1) return
    state.records.splice(index, 1)
  })
}
