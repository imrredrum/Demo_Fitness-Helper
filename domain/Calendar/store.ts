import { create } from 'zustand'
import { WorkoutRecord } from '../Record/schema'

type CalendarStore = {
  loading: boolean
  selectedDate: Date | null
  current: {
    year: number
    month: number
  } | null
  monthlyRecordsByDate: { date: Date; records: WorkoutRecord[] }[]
}

const initCalendar: CalendarStore = {
  loading: false,
  selectedDate: null,
  current: null,
  monthlyRecordsByDate: [],
}

const useCalendar = create<CalendarStore>(() => initCalendar)

export default useCalendar

export const setSelectedDate = (date: Date | null) =>
  useCalendar.setState({ selectedDate: date })

export const setCalendarCurrent = (year: number, month: number) =>
  useCalendar.setState({ current: { year, month } })

export const setMonthlyRecordsByDate = (
  records: { date: Date; records: WorkoutRecord[] }[],
) => useCalendar.setState({ monthlyRecordsByDate: records })

export const markCalendarLoading = (loading: boolean) =>
  useCalendar.setState({ loading })
