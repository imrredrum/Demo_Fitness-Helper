import { Container, Stack } from '@mui/material'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Container maxWidth='lg' sx={{ height: '100dvh', overflow: 'hidden' }}>
    <Stack
      direction='column'
      sx={{
        height: 'stretch',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        '> *': {
          width: 1 / 1,
          flex: '0 0 auto',
        },
      }}
    >
      {children}
    </Stack>
  </Container>
)

export default MainLayout
