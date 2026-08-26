import { Box, Container, Stack, Typography, IconButton } from '@mui/material'
import { ClientLink } from '@/component/ClientLink'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { RecordCalendar, RecordList } from '@/component/Record'

const HistoryPage: React.FC = () => (
  <Container
    maxWidth='md'
    component='main'
    sx={{
      height: 'stretch',
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: 2,
      py: 4,
    }}
  >
    <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
      <IconButton component={ClientLink} href='/' aria-label='back'>
        <ArrowBackIosNewRoundedIcon />
      </IconButton>
      <Typography variant='h4' component='h1' sx={{ flex: '1 1 auto' }}>
        History
      </Typography>
    </Stack>
    <Box sx={{ flexShrink: 1, flexGrow: 1, overflowY: 'auto' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{
          width: 1 / 1,
          height: 'stretch',
          overflow: 'hidden',
          alignItems: 'stretch',
        }}
      >
        <Box sx={{ flexShrink: 0, flexGrow: 0 }}>
          <RecordCalendar />
        </Box>
        <Box sx={{ flexShrink: 1, flexGrow: 1, overflow: 'auto' }}>
          <RecordList />
        </Box>
      </Stack>
    </Box>
  </Container>
)

export default HistoryPage
