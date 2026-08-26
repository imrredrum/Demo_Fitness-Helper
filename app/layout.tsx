import theme from '@/style/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import ClientProviders from '@/component/ClientProviders'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { SNACK_BAR_DURATION } from '@/config'
import ExerciseCategoryProvider from '@/domain/ExerciseCategory/provider'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'Demo: Fitness Helper',
  description:
    'A fitness helper app built with Next.js, React, and Material-UI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-Hant-TW' className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ClientProviders
              SnackbarProvider={{
                autoHideDuration: SNACK_BAR_DURATION.default,
              }}
            >
              <ExerciseCategoryProvider>{children}</ExerciseCategoryProvider>
            </ClientProviders>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
