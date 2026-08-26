'use client'

import { useState, useEffect } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  DateCalendar,
  DayCalendarSkeleton,
  PickerDay,
  pickerDayClasses,
} from '@mui/x-date-pickers'
import { alpha } from '@mui/material/styles'
import useCalendar, {
  setCalendarCurrent,
  setSelectedDate,
} from '@/domain/Calendar/store'
import dayjs, { type Dayjs } from 'dayjs'
import { Button, Collapse, Stack, useMediaQuery } from '@mui/material'

type HighlightedDayProps = React.ComponentProps<typeof PickerDay> & {
  highlightedDays?: number[]
}

const HighlightedDay: React.FC<HighlightedDayProps> = props => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0

  return (
    <PickerDay
      {...other}
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
      sx={{
        ...(isSelected && {
          bgcolor: theme => alpha(theme.palette.success.light, 0.4),
          [`&:hover, &:focus, &.${pickerDayClasses.selected}`]: {
            bgcolor: theme => alpha(theme.palette.success.light, 1),
          },
        }),
      }}
    />
  )
}

const RecordCalendar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  useEffect(() => {
    if (isMobile) return
    setTimeout(() => setCollapsed(false), 0)
  }, [isMobile])

  const toggleCollapse = () => {
    setCollapsed(prev => !prev)
  }

  const loading = useCalendar(s => s.loading)
  const selectedDate = useCalendar(s => s.selectedDate)
  const highlightedDays = useCalendar(s => s.monthlyRecordsByDate).map(item =>
    dayjs(item.date).get('date'),
  )

  const handleMonthChange = (date: Dayjs | null) => {
    if (!date) return
    setCalendarCurrent(date.year(), date.month())
  }

  const handleDayClick = (date: Dayjs | null) => {
    setSelectedDate(date?.toDate() ?? null)
  }

  return (
    <Stack direction='column' sx={{ width: 1 / 1 }}>
      <Button
        onClick={toggleCollapse}
        variant='outlined'
        startIcon={
          <ExpandMoreIcon
            sx={{
              transition: theme =>
                theme.transitions.create('transform', {
                  duration: theme.transitions.duration.shortest,
                }),
              transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          />
        }
        sx={{ display: { md: 'none' } }}
      >
        {collapsed ? 'Show Calendar' : 'Hide Calendar'}
      </Button>
      <Collapse in={!collapsed}>
        <DateCalendar
          disableFuture
          value={selectedDate ? dayjs(selectedDate) : null}
          loading={loading}
          onMonthChange={handleMonthChange}
          onChange={handleDayClick}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: HighlightedDay as React.ElementType<
              React.ComponentProps<typeof PickerDay>
            >,
          }}
          slotProps={{
            day: {
              highlightedDays,
            } as HighlightedDayProps,
          }}
          sx={{
            maxWidth: 1 / 1,
          }}
        />
      </Collapse>
    </Stack>
  )
}

export default RecordCalendar
