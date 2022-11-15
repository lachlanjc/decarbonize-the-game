// import type { GetStaticProps } from 'next'
import Head from 'next/head'

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Midcentury Future</title>
      </Head>

      <footer className="p-8 w-full items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-4xl mx-auto text-sm">
          <p className="text-stone-600 mr-auto">
            {'Site by '}
            <a
              href="https://lachlanjc.com"
              className="hover:underline text-emerald-600"
            >
              @lachlanjc
            </a>
            , November 2022.
          </p>
          <a
            className="hover:underline text-emerald-600"
            href="https://github.com/lachlanjc/midcentury-future"
          >
            Open source on GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home
