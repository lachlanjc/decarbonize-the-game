import type { PropsWithChildren } from 'react'
import '../styles/globals.css'
import localFont from '@next/font/local'
import clsx from 'clsx'

const relativePro = localFont({
  src: [
    {
      path: './fonts/relative-book-pro.woff2',
      weight: 'normal',
      style: 'regular',
    },
    {
      path: './fonts/relative-bold-pro.woff2',
      weight: 'bold',
      style: 'regular',
    },
  ],
  variable: '--font-relative-pro',
  preload: true,
})

const relativeMono = localFont({
  src: './fonts/relative-mono-12-pitch-pro.woff2',
  variable: '--font-relative-mono',
  preload: true,
})

function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <html
      lang="en-US"
      className={clsx(relativePro.variable, relativeMono.variable)}
    >
      <head />
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  )
}

export default Layout
