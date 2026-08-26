import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RestSession } from './schema'
import { immer } from 'zustand/middleware/immer'
import dayjs from 'dayjs'

export type RestStore = RestSession & {
  _hasHydrated: boolean
}

const initRest: RestStore = {
  _hasHydrated: false,
  exId: undefined,
  setId: undefined,
  endTime: undefined,
}

const useRest = create<RestStore>()(
  persist(
    immer(() => initRest),
    {
      name: 'rest-session-storage',
      onRehydrateStorage: () => state => {
        if (!state) return
        state._hasHydrated = true
      },
    },
  ),
)

export default useRest

export const startRestSession = (
  exId: string,
  setId: string,
  endTime: Date,
) => {
  useRest.setState({
    exId,
    setId,
    endTime,
  })
}

export const endRestSession = () => {
  useRest.setState({
    exId: undefined,
    setId: undefined,
    endTime: undefined,
  })
}

export const updateRestSession = (updates: Partial<RestSession>) => {
  useRest.setState(updates)
}

export const modifyRestSessionEndTime = (increase: number) => {
  useRest.setState(state => {
    if (!state.endTime) return
    state.endTime = dayjs(state.endTime).add(increase, 'second').toDate()
  })
}
