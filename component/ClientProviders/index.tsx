'use client'

import { SnackbarProvider, SnackbarProviderProps } from 'notistack'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type ClientProvidersProps = {
  SnackbarProvider?: SnackbarProviderProps
}

const ClientProviders: React.FC<
  React.PropsWithChildren<ClientProvidersProps>
> = ({ children, SnackbarProvider: snackbarProviderProps }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <SnackbarProvider {...snackbarProviderProps}>{children}</SnackbarProvider>
  </LocalizationProvider>
)

export default ClientProviders
