'use client'

import useCalendar from '@/domain/Calendar/store'
import dayjs from 'dayjs'
import { useMemo, Fragment } from 'react'
import CommentRoundedIcon from '@mui/icons-material/CommentRounded'
import {
  Stack,
  Divider,
  Paper,
  Typography,
  Tooltip,
  Button,
} from '@mui/material'
import { Summary } from '../Summary'

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
      <Typography variant='subtitle1' color='textSecondary'>
        {dayjs(selectedDate).format('YYYY-MM-DD')}
      </Typography>
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
            <Stack
              direction='row'
              spacing={1}
              sx={{ alignItems: 'center', justifyContent: 'center', mb: 1.5 }}
            >
              <Typography variant='subtitle2' color='textSecondary'>
                {dayjs(record.startedAt).format('M/D HH:mm')}
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                ~
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                {dayjs(record.finishedAt).format('M/D HH:mm')}
              </Typography>
              {record.note && (
                <>
                  <Divider orientation='vertical' flexItem />
                  <Tooltip
                    title={record.note}
                    enterTouchDelay={0}
                    leaveTouchDelay={3000}
                    slotProps={{
                      tooltip: {
                        sx: {
                          whiteSpace: 'pre-line',
                        },
                      },
                    }}
                  >
                    <Button
                      variant='text'
                      size='small'
                      color='inherit'
                      sx={{ minWidth: 'unset' }}
                    >
                      <CommentRoundedIcon fontSize='small' color='inherit' />
                    </Button>
                  </Tooltip>
                </>
              )}
            </Stack>
            <Summary workout={record} />
          </Paper>
          {index !== records.length - 1 && <Divider flexItem />}
        </Fragment>
      ))}
    </Stack>
  )
}

export default RecordList
