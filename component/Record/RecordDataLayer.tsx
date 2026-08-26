'use client'

import useRecord from '@/domain/Record/store'
import { useEffect, useMemo } from 'react'
import useCalendar, {
  markCalendarLoading,
  setCalendarCurrent,
  setMonthlyRecordsByDate,
  setSelectedDate,
} from '@/domain/Calendar/store'
import dayjs from 'dayjs'

const RecordDataLayer: React.FC = () => {
  const hydrated = useRecord(s => s._hasHydrated)
  const records = useRecord(s => s.records)
  const selectedDate = useCalendar(s => s.selectedDate)
  const current = useCalendar(s => s.current)

  useEffect(() => {
    if (selectedDate) return
    setSelectedDate(dayjs().toDate())
  }, [selectedDate])

  useEffect(() => {
    if (current) return
    setCalendarCurrent(dayjs().year(), dayjs().month())
  }, [current])

  useEffect(() => {
    markCalendarLoading(!hydrated)
  }, [hydrated])

  const monthlyRecordsByDate = useMemo(() => {
    if (!current) return []
    const { year, month } = current
    return records
      .filter(record => {
        const recordDate = dayjs(record.startedAt)
        return (
          recordDate.get('year') === year && recordDate.get('month') === month
        )
      })
      .reduce(
        (acc, record) => {
          const date = dayjs(record.startedAt).toDate()
          const existing = acc.find(
            item => item.date.getTime() === date.getTime(),
          )
          if (existing) {
            existing.records.push(record)
          } else {
            acc.push({ date, records: [record] })
          }
          return acc
        },
        [] as { date: Date; records: typeof records }[],
      )
  }, [records, current])

  useEffect(() => {
    setMonthlyRecordsByDate(monthlyRecordsByDate)
  }, [monthlyRecordsByDate])

  return null
}

export default RecordDataLayer
