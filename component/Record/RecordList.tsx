'use client'

import useCalendar from '@/domain/Calendar/store'
import dayjs from 'dayjs'
import { useMemo, Fragment } from 'react'
import { Summary } from '../Summary'
import { Stack, Divider, Box, Card, Paper, Typography } from '@mui/material'

const RecordList = () => {
  const selectedDate = useCalendar(s => s.selectedDate)
  const monthlyRecordsByDate = useCalendar(s => s.monthlyRecordsByDate)

  const records = useMemo(() => {
    if (!selectedDate) return []
    console.log(
      monthlyRecordsByDate.find(records =>
        dayjs(records.date).isSame(selectedDate, 'day'),
      )?.records,
    )
    return (
      monthlyRecordsByDate.find(records =>
        dayjs(records.date).isSame(selectedDate, 'day'),
      )?.records || []
    )
  }, [selectedDate, monthlyRecordsByDate])

  return (
    <Stack
      direction='column'
      spacing={2}
      sx={{
        width: 1 / 1,
        height: 'stretch',
        overflow: 'auto',
        flex: '1 1 auto',
        borderRadius: 2,
      }}
    >
      {records.length === 0 && (
        <Paper sx={{ borderRadius: 2, boxShadow: 'none', p: 2 }}>
          <Typography variant='caption' color='textDisabled'>
            <em>No records found for the selected date.</em>
          </Typography>
        </Paper>
      )}
      {records.map((record, index) => (
        <Fragment key={record.id}>
          <Paper sx={{ borderRadius: 2, boxShadow: 'none', p: 2 }}>
            <Summary workout={record} />
          </Paper>
          {index !== records.length - 1 && <Divider flexItem />}
        </Fragment>
      ))}
    </Stack>
  )
}

export default RecordList
