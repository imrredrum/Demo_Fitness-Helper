'use client'

import {
  ExerciseCategoryByWeight,
  ELoadUnit,
} from '@/domain/ExerciseCategory/schema'
import { getExerciseCategory } from '@/domain/ExerciseCategory/utils'
import type { ExerciseRecord } from '@/domain/Record/schema'
import { calculateDuration } from '@/domain/share/utils'
import {
  Box,
  List,
  Popover,
  ListItemText,
  Tooltip,
  ListItemButton,
} from '@mui/material'
import CommentRoundedIcon from '@mui/icons-material/CommentRounded'
import { useState } from 'react'

type ExerciseSummaryProps = {
  exercise: ExerciseRecord
}

const ExerciseSummary: React.FC<
  React.PropsWithChildren<ExerciseSummaryProps>
> = ({ children, exercise }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)
  const id = open ? `exercise-summary-popover-${exercise.id}` : undefined

  return (
    <>
      <Box aria-describedby={id} onClick={handleClick}>
        {children}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List disablePadding sx={{ minWidth: 200, overflow: 'auto' }}>
          {exercise.sets.map((set, index) => (
            <Tooltip
              key={set.id}
              title={set.note}
              arrow
              enterTouchDelay={0}
              leaveTouchDelay={3000}
              slotProps={{
                tooltip: {
                  sx: {
                    whiteSpace: 'pre-line',
                  },
                },
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}
            >
              <ListItemButton divider={index < exercise.sets.length - 1}>
                <ListItemText
                  secondary={`# ${index + 1}`}
                  {...('load' in set &&
                    'reps' in set && {
                      primary: (
                        <>
                          {set.load}{' '}
                          {(
                            getExerciseCategory(exercise.exCatId) as
                              | ExerciseCategoryByWeight
                              | undefined
                          )?.loadUnit ?? ELoadUnit.KG}{' '}
                          * {set.reps} 次
                        </>
                      ),
                    })}
                  {...('durationInSeconds' in set && {
                    primary: calculateDuration([set]).formatted,
                  })}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'flex-start',
                    gap: 1,
                    overflow: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  slotProps={{
                    secondary: {
                      sx: {
                        order: -1,
                      },
                    },
                  }}
                />
                {Boolean(set.note) && (
                  <CommentRoundedIcon fontSize='small' color='inherit' />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Popover>
    </>
  )
}
export default ExerciseSummary
