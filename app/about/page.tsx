import Video from './video'

export default function AboutPage() {
  return (
    <div className="w-full h-full [min-height:100dvh] bg-sky-50 dark:bg-zinc-900 selection:bg-pink-300 dark:selection:bg-pink-400">
      <main className="w-full max-w-2xl py-20 px-4 mx-auto text-sky-900 dark:text-sky-50">
        <header className="text-center mb-10">
          <svg
            width="456"
            height="96"
            viewBox="0 0 456 96"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto max-w-full text-sky-600 dark:text-sky-300"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M45.8393 21.217H33.4508C32.9832 21.2161 32.52 21.3075 32.0877 21.4858C31.6554 21.6641 31.2625 21.9258 30.9314 22.2561L16.6975 36.49C16.3673 36.821 16.1055 37.214 15.9272 37.6462C15.749 38.0785 15.6576 38.5417 15.6585 39.0094H30C30 39.0094 30 39.0094 30 39.0094H80.3415C80.3426 38.3925 80.2221 37.7813 79.9869 37.2109C79.7516 36.6405 79.4063 36.1221 78.9705 35.6853L60.19 16.9048C59.7532 16.4691 59.2348 16.1237 58.6644 15.8885C58.094 15.6532 57.4829 15.5327 56.8659 15.5338H53.4756C52.8587 15.5327 52.2475 15.6532 51.6771 15.8885C51.1067 16.1237 50.5883 16.4691 50.1515 16.9048L45.8393 21.217Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.6851 42.3039C11.0947 42.1041 11.5443 42.0001 12 42L48 42H84C84.4557 42.0001 84.9054 42.1041 85.3149 42.3039C85.7245 42.5038 86.0831 42.7943 86.3636 43.1535C86.6441 43.5126 86.8391 43.9309 86.9337 44.3767C87.0284 44.8224 87.0203 45.2839 86.91 45.726L80.0572 73.1374C84.1477 75.0468 86.9822 79.1968 86.9822 84.0089C86.9822 90.6314 81.6136 96 74.9911 96C68.3686 96 63 90.6314 63 84.0089C63 84.0059 63 84.003 63 84H48L33 84C33 84.003 33 84.0059 33 84.0089C33 90.6314 27.6314 96 21.0089 96C14.3864 96 9.01783 90.6314 9.01783 84.0089C9.01783 79.1968 11.8524 75.0468 15.9429 73.1374L9.09003 45.726C8.97975 45.2839 8.97164 44.8224 9.06633 44.3766C9.16102 43.9309 9.356 43.5126 9.63649 43.1534C9.91698 42.7943 10.2756 42.5038 10.6851 42.3039ZM21.8518 72.0469C25.9294 72.3301 29.4455 74.6518 31.3881 78L48 78H64.6119C66.5545 74.6518 70.0707 72.3301 74.1483 72.0469L80.16 48H48L15.84 48L21.8518 72.0469ZM21.0089 90C24.3177 90 27 87.3177 27 84.0089C27 80.7001 24.3177 78.0178 21.0089 78.0178C17.7001 78.0178 15.0178 80.7001 15.0178 84.0089C15.0178 87.3177 17.7001 90 21.0089 90ZM74.9911 90C78.2999 90 80.9822 87.3177 80.9822 84.0089C80.9822 80.7001 78.2999 78.0178 74.9911 78.0178C71.6823 78.0178 69 80.7001 69 84.0089C69 87.3177 71.6823 90 74.9911 90Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.6824 51L24.2537 69.2851C26.4938 69.7337 28.3895 70.7614 29.8744 71.8939C31.1574 72.8724 32.2036 73.9801 32.9836 75L63.0642 75C63.8715 73.9845 64.9491 72.8702 66.2529 71.8854C67.7118 70.7835 69.5706 69.7586 71.7428 69.2998L76.3178 51L19.6824 51Z"
              fillOpacity="0.5"
            />
            <path d="M195 75C195 78.1826 193.736 81.2348 191.485 83.4853C189.235 85.7357 186.183 87 183 87H153C149.817 87 146.765 85.7357 144.515 83.4853C142.264 81.2348 141 78.1826 141 75V63H147V75C147 76.5913 147.632 78.1174 148.757 79.2426C149.883 80.3679 151.409 81 153 81H183C184.591 81 186.117 80.3679 187.243 79.2426C188.368 78.1174 189 76.5913 189 75V63H195V75Z" />
            <path d="M195 33C195 29.8174 193.736 26.7652 191.485 24.5147C189.235 22.2643 186.183 21 183 21H153C149.817 21 146.765 22.2643 144.515 24.5147C142.264 26.7652 141 29.8174 141 33V63H147V33C147 31.4087 147.632 29.8826 148.757 28.7574C149.883 27.6321 151.409 27 153 27H183C184.591 27 186.117 27.6321 187.243 28.7574C188.368 29.8826 189 31.4087 189 33V63H195V33Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M163.832 45.4721C163.554 47.069 163.593 48.6447 164 50C164 50 162.924 49.3851 162.05 48.3257C161.348 47.4746 160.777 46.3365 161 45H161C160.947 45.0527 160.895 45.1056 160.843 45.1586C159.895 46.1327 159.12 47.1629 158.491 48.2069C156.555 51.421 156 54.7653 156 57C156 59.351 156.606 61.3637 157.662 63H178.338C179.394 61.3637 180 59.351 180 57C180 53.456 178.5 50 176 48C174.75 47 173.83 46 173.165 45L163.924 45C163.89 45.1574 163.86 45.3149 163.832 45.4721ZM177.108 45C177.341 45.2154 177.596 45.4345 177.874 45.6574C181.194 48.313 183 52.6924 183 57C183 59.2089 182.56 61.2259 181.749 63H195V45L177.108 45ZM154.251 63H145V45H157.038C153.849 49.2504 153 53.9671 153 57C153 59.2089 153.44 61.2259 154.251 63Z"
              fillOpacity="0.5"
            />
            <path d="M153 84.0001C153 85.5914 153.632 87.1175 154.757 88.2428C155.883 89.368 157.409 90.0001 159 90.0001H177C178.591 90.0001 180.117 89.368 181.243 88.2428C182.368 87.1175 183 85.5914 183 84.0001H153Z" />
            <path d="M153 15V21H159V15H177V21H183V15C183 13.4087 182.368 11.8826 181.243 10.7574C180.117 9.63214 178.591 9 177 9H159C157.409 9 155.883 9.63214 154.757 10.7574C153.632 11.8826 153 13.4087 153 15Z" />
            <path d="M168 68C161.372 68 156 64 156 57C156 54 157 49 161 45C160.5 48 164 50 164 50C162.5 45 166 37 172 36C171.284 40 171 44 176 48C178.5 50 180 53.456 180 57C180 64 174.628 68 168 68Z" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M283.5 62.3133V96H292.5V62.3133C291.08 62.7595 289.568 63 288 63C286.432 63 284.921 62.7595 283.5 62.3133Z"
            />
            <path d="M288 0C289.591 0 291.117 0.632141 292.243 1.75736C293.368 2.88258 294 4.4087 294 6V37.608H282V6C282 4.4087 282.632 2.88258 283.757 1.75736C284.883 0.632141 286.409 0 288 0Z" />
            <path d="M282 58.392L254.628 74.196C253.945 74.5962 253.19 74.8574 252.406 74.9646C251.622 75.0718 250.825 75.0228 250.06 74.8206C249.295 74.6183 248.577 74.2668 247.949 73.7861C247.32 73.3055 246.793 72.7052 246.397 72.02C246.002 71.3347 245.746 70.5779 245.644 69.7933C245.542 69.0086 245.596 68.2115 245.803 67.4478C246.01 66.6842 246.367 65.9691 246.852 65.3437C247.336 64.7184 247.94 64.1951 248.628 63.804L276 48L282 58.392Z" />
            <path d="M300 48L327.372 63.804C328.06 64.1951 328.664 64.7184 329.148 65.3437C329.633 65.9691 329.99 66.6842 330.197 67.4478C330.404 68.2115 330.458 69.0086 330.356 69.7933C330.254 70.5779 329.998 71.3347 329.603 72.02C329.207 72.7052 328.68 73.3055 328.051 73.7861C327.422 74.2668 326.705 74.6183 325.94 74.8206C325.175 75.0228 324.378 75.0718 323.594 74.9646C322.81 74.8574 322.055 74.5962 321.372 74.196L294 58.392L300 48Z" />
            <circle
              cx="288"
              cy="48"
              r="9"
              stroke="currentColor"
              strokeWidth="6"
            />
            <path
              d="M256.757 28.7574C257.882 27.6321 259.409 27 261 27C262.591 27 264.117 27.6321 265.243 28.7574C266.368 29.8826 267 31.4087 267 33C267 34.5913 266.368 36.1174 265.243 37.2426C264.117 38.3679 262.591 39 261 39H243C242.204 39 241.441 39.3161 240.879 39.8787C240.316 40.4413 240 41.2044 240 42C240 42.7957 240.316 43.5587 240.879 44.1213C241.441 44.6839 242.204 45 243 45H261C263.373 45 265.693 44.2962 267.667 42.9776C269.64 41.6591 271.178 39.7849 272.086 37.5922C272.995 35.3995 273.232 32.9867 272.769 30.6589C272.306 28.3311 271.163 26.193 269.485 24.5147C267.807 22.8365 265.669 21.6936 263.341 21.2306C261.013 20.7676 258.6 21.0052 256.408 21.9135C254.215 22.8217 252.341 24.3598 251.022 26.3332C249.704 28.3066 249 30.6266 249 33C249 33.7957 249.316 34.5587 249.879 35.1213C250.441 35.6839 251.204 36 252 36C252.796 36 253.559 35.6839 254.121 35.1213C254.684 34.5587 255 33.7957 255 33C255 31.4087 255.632 29.8826 256.757 28.7574Z"
              fillOpacity="0.5"
            />
            <path
              d="M316.757 10.7574C317.883 9.63214 319.409 9 321 9C322.591 9 324.117 9.63214 325.243 10.7574C326.368 11.8826 327 13.4087 327 15C327 16.5913 326.368 18.1174 325.243 19.2426C324.117 20.3679 322.591 21 321 21H303C302.204 21 301.441 21.3161 300.879 21.8787C300.316 22.4413 300 23.2044 300 24C300 24.7957 300.316 25.5587 300.879 26.1213C301.441 26.6839 302.204 27 303 27H321C323.373 27 325.693 26.2962 327.667 24.9776C329.64 23.6591 331.178 21.7849 332.087 19.5922C332.995 17.3995 333.232 14.9867 332.769 12.6589C332.306 10.3311 331.164 8.19295 329.485 6.51472C327.807 4.83649 325.669 3.6936 323.341 3.23058C321.013 2.76756 318.601 3.0052 316.408 3.91345C314.215 4.8217 312.341 6.35977 311.022 8.33316C309.704 10.3066 309 12.6266 309 15C309 15.7957 309.316 16.5587 309.879 17.1213C310.441 17.6839 311.204 18 312 18C312.796 18 313.559 17.6839 314.121 17.1213C314.684 16.5587 315 15.7957 315 15C315 13.4087 315.632 11.8826 316.757 10.7574Z"
              fillOpacity="0.5"
            />
            <path d="M408 72C414.365 72 420.47 69.4714 424.971 64.9706C429.471 60.4697 432 54.3652 432 48C432 41.6348 429.471 35.5303 424.971 31.0294C420.47 26.5286 414.365 24 408 24C401.635 24 395.53 26.5286 391.029 31.0294C386.529 35.5303 384 41.6348 384 48C384 54.3652 386.529 60.4697 391.029 64.9706C395.53 69.4714 401.635 72 408 72V72ZM408 0C408.796 0 409.559 0.316071 410.121 0.87868C410.684 1.44129 411 2.20435 411 3V15C411 15.7956 410.684 16.5587 410.121 17.1213C409.559 17.6839 408.796 18 408 18C407.204 18 406.441 17.6839 405.879 17.1213C405.316 16.5587 405 15.7956 405 15V3C405 2.20435 405.316 1.44129 405.879 0.87868C406.441 0.316071 407.204 0 408 0V0ZM408 78C408.796 78 409.559 78.3161 410.121 78.8787C410.684 79.4413 411 80.2044 411 81V93C411 93.7956 410.684 94.5587 410.121 95.1213C409.559 95.6839 408.796 96 408 96C407.204 96 406.441 95.6839 405.879 95.1213C405.316 94.5587 405 93.7956 405 93V81C405 80.2044 405.316 79.4413 405.879 78.8787C406.441 78.3161 407.204 78 408 78V78ZM456 48C456 48.7956 455.684 49.5587 455.121 50.1213C454.559 50.6839 453.796 51 453 51H441C440.204 51 439.441 50.6839 438.879 50.1213C438.316 49.5587 438 48.7956 438 48C438 47.2044 438.316 46.4413 438.879 45.8787C439.441 45.3161 440.204 45 441 45H453C453.796 45 454.559 45.3161 455.121 45.8787C455.684 46.4413 456 47.2044 456 48ZM378 48C378 48.7956 377.684 49.5587 377.121 50.1213C376.559 50.6839 375.796 51 375 51H363C362.204 51 361.441 50.6839 360.879 50.1213C360.316 49.5587 360 48.7956 360 48C360 47.2044 360.316 46.4413 360.879 45.8787C361.441 45.3161 362.204 45 363 45H375C375.796 45 376.559 45.3161 377.121 45.8787C377.684 46.4413 378 47.2044 378 48ZM441.942 14.058C442.504 14.6206 442.82 15.3835 442.82 16.179C442.82 16.9745 442.504 17.7374 441.942 18.3L433.458 26.79C433.179 27.0685 432.848 27.2894 432.484 27.44C432.119 27.5906 431.729 27.6679 431.335 27.6677C430.539 27.6671 429.776 27.3503 429.213 26.787C428.934 26.5081 428.714 26.177 428.563 25.8127C428.412 25.4484 428.335 25.0581 428.335 24.6639C428.336 23.8678 428.653 23.1045 429.216 22.542L437.7 14.058C438.263 13.4956 439.026 13.1796 439.821 13.1796C440.616 13.1796 441.379 13.4956 441.942 14.058V14.058ZM386.784 69.216C387.346 69.7786 387.662 70.5415 387.662 71.337C387.662 72.1325 387.346 72.8954 386.784 73.458L378.3 81.942C377.734 82.4885 376.976 82.7909 376.19 82.784C375.403 82.7772 374.651 82.4617 374.095 81.9055C373.538 81.3492 373.223 80.5968 373.216 79.8102C373.209 79.0236 373.512 78.2658 374.058 77.7L382.542 69.216C383.105 68.6536 383.868 68.3376 384.663 68.3376C385.458 68.3376 386.221 68.6536 386.784 69.216V69.216ZM441.942 81.942C441.379 82.5044 440.616 82.8204 439.821 82.8204C439.026 82.8204 438.263 82.5044 437.7 81.942L429.216 73.458C428.67 72.8922 428.367 72.1344 428.374 71.3478C428.381 70.5612 428.696 69.8088 429.253 69.2525C429.809 68.6963 430.561 68.3808 431.348 68.374C432.134 68.3671 432.892 68.6695 433.458 69.216L441.942 77.7C442.504 78.2626 442.82 79.0255 442.82 79.821C442.82 80.6165 442.504 81.3794 441.942 81.942ZM386.784 26.79C386.221 27.3524 385.458 27.6684 384.663 27.6684C383.868 27.6684 383.105 27.3524 382.542 26.79L374.058 18.3C373.771 18.0233 373.543 17.6922 373.386 17.3262C373.228 16.9602 373.146 16.5665 373.142 16.1682C373.139 15.7699 373.215 15.3748 373.366 15.0061C373.516 14.6374 373.739 14.3025 374.021 14.0208C374.302 13.7391 374.637 13.5164 375.006 13.3655C375.375 13.2147 375.77 13.1388 376.168 13.1422C376.567 13.1457 376.96 13.2285 377.326 13.3857C377.692 13.5429 378.023 13.7715 378.3 14.058L386.784 22.542C387.063 22.8207 387.285 23.1517 387.436 23.5162C387.588 23.8807 387.665 24.2714 387.665 24.666C387.665 25.0606 387.588 25.4513 387.436 25.8158C387.285 26.1803 387.063 26.5113 386.784 26.79V26.79Z" />
          </svg>

          <h1 className="font-bold text-4xl md:text-5xl mt-4">
            Decarbonize: The&nbsp;Game
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg font-mono mt-4">
            A project by{' '}
            <a
              href="https://lachlanjc.com"
              className="text-sky-600 bg-sky-400 bg-opacity-20 hover:bg-opacity-30 focus:bg-opacity-30 transition-colors px-1 rounded-md"
            >
              @lachlanjc
            </a>
            , December&nbsp;2022
          </p>
        </header>
        <article className="flex flex-col gap-6 text-lg leading-relaxed">
          <p
            className={`
              supports-[-webkit-initial-letter:2]:first-letter:text-pink-400
              supports-[-webkit-initial-letter:2]:first-letter:font-bold
              supports-[-webkit-initial-letter:2]:first-letter:pr-[1ch]
              supports-[-webkit-initial-letter:2]:first-letter:[-webkit-initial-letter:2]
            `}
          >
            Over the next few decades, the U.S. needs to produce dramatically
            more electricity to power technologies replacing fossil fuel use,
            such as electric cars and heat pumps. At the same time, we need to
            keep energy prices & the electric grid stable, all while reducing
            the carbon emissions of our current electricity.
          </p>
          <p>
            This is a game where you’re in control of the electricity grid, from
            2000–2050. There’s 4 types of energy sources you can add to the
            grid: solar, wind, natural gas, and coal. As you build out the grid
            with each source, you’ll watch carbon emissions and energy prices be
            calculated in real time.
          </p>
          <p>
            The coal is real anthracite coal from Eastern PA, the solar panels
            are laser-cut from thick blue acrylic, and the gas and wind pieces
            are laser-cut cardboard. Each has a barcode on the back, which the
            iPad scans.
          </p>
          <p>
            The game software is a Next.js app using{' '}
            <a className="underline" href="https://github.com/pmndrs/zustand">Zustand</a>{', '}
            <a className="underline" href="https://tailwindcss.com">Tailwind CSS</a>{', '}
            <a className="underline" href="https://recharts.org/">Recharts</a>,
            and <a className="underline" href="https://github.com/ericblade/quagga2">quagga2</a>.
          </p>
          <Video />
          <p className="text-zinc-600 dark:text-zinc-400 md:text-right text-sm -mt-4">
            Video by{' '}
            <a
              href="https://www.matthewstanciu.me"
              className="text-sky-500 font-bold"
            >
              Matthew Stanciu
            </a>
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <a
              href="https://github.com/lachlanjc/decarbonize-the-game/"
              className="inline-block text-center rounded-full border-2 border-transparent bg-pink-400 hover:bg-pink-500 transition-colors px-4 py-2 text-lg font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Source code
            </a>
            <a
              href="https://github.com/lachlanjc/decarbonize-the-game/"
              className="inline-block text-center rounded-full border-2 [border-color:currentColor] text-pink-400 hover:text-pink-500 transition-colors px-4 py-2 text-lg font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Process documentation
            </a>
          </div>
          <div className="p-4 md:p-5 rounded-lg bg-sky-100 dark:bg-sky-900 mt-8">
            <h2 className="mb-2 text-lg font-bold">
              Playing without the pieces
            </h2>
            <p className="text-sky-800 dark:text-sky-200 font-mono mb-4">
              You can open the game yourself; use keyboard shortcuts instead of
              the camera scanning to purchase additional energy sources:
              <br />
              <kbd className="bg-white text-sky-600 font-mono px-2 rounded-md">a</kbd>{' '}
              (solar),{' '}
              <kbd className="bg-white text-sky-600 font-mono px-2 rounded-md">s</kbd>{' '}
              (wind),{' '}
              <kbd className="bg-white text-sky-600 font-mono px-2 rounded-md">d</kbd>{' '}
              (coal),{' '}
              <kbd className="bg-white text-sky-600 font-mono px-2 rounded-md">f</kbd>{' '}
              (gas).
            </p>
            <p>
              <a
                href="https://decarbonize-the-game.vercel.app/"
                className="inline-block rounded-full border-2 [border-color:currentColor] text-pink-400 hover:text-pink-500 transition-colors px-4 py-1 font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                Open game
              </a>
            </p>
          </div>
        </article>
      </main>
    </div>
  )
}
