'use client'

import { ReactNode, useEffect, useRef } from 'react'
import useGameState, { CONSTANTS, type SourceName } from './state'
import EmissionsChart from './emissions-chart'
import PriceChart from './price-chart'
import Board from './board'
import { IconCoal, IconGas, IconWind, IconSolar } from './icons'
import { ArrowRepeat, EmojiFrownFill } from 'react-bootstrap-icons'
import useKeypress from 'react-use-keypress'
import useSound from 'use-sound'
import useScan from './use-scan'

const sourceIcons: Record<SourceName, ReactNode> = {
  solar: <IconSolar className="fill-amber-300" size={52} />,
  wind: <IconWind className="fill-white" size={52} />,
  coal: <IconCoal className="fill-black" size={52} />,
  gas: <IconGas className="fill-gray-800" size={52} />,
}

function Page() {
  const gameState = useGameState()
  const scannerRef = useRef<HTMLDivElement>(null)

  const isGameOver = gameState.isGameOver()
  // const currentCapacity = gameState.getCurrentCapacity()
  // const isCapacityOver =
  //   currentCapacity >= gameState.capacityGoal &&
  //   gameState.capacityLastHit <= gameState.year - 5

  const [playPurchase] = useSound('/sounds/bite.mp3', { volume: 0.875 })

  useEffect(() => {
    const yearTicker = setInterval(() => gameState.tickYear(), 1500)

    return () => {
      clearInterval(yearTicker)
    }
  }, [])

  useKeypress('e', () => {
    gameState.endGame()
  })
  useKeypress('a', () => {
    gameState.purchase('solar')
    playPurchase()
  })
  useKeypress('s', () => {
    gameState.purchase('wind')
    playPurchase()
  })
  useKeypress('d', () => {
    gameState.purchase('coal')
    playPurchase()
  })
  useKeypress('f', () => {
    gameState.purchase('gas')
    playPurchase()
  })

  useScan({
    onDetected: (result) => {
      const key = result?.toLowerCase()
      if (Object.keys(sourceIcons).includes(key)) {
        console.log('RECOGNIZED', key)
        if (
          gameState.year > CONSTANTS.gameYearStart + 6 &&
          [gameState.year, gameState.year - 1].includes(
            gameState.installed
              .filter(({ source }) => source === key)
              .reverse()[0]?.year
          )
        ) {
          console.log('source recently purchased, punting')
        } else {
          gameState.purchase(key as SourceName)
          playPurchase()
        }
      }
    },
    scannerRef,
    isPaused: isGameOver,
  })

  return (
    <main
      className={`flex full-width min-h-screen flex-col items-center justify-center relative transition-colors ${
        isGameOver ? 'bg-black' : 'bg-sky-500'
      } text-white`}
    >
      <EmissionsChart emissions={gameState.emissionsLog} />
      <PriceChart prices={gameState.priceLog} />
      <Board
        installed={gameState.installed}
        addlCapacity={gameState.capacityGoal - gameState.getCurrentCapacity()}
        isGameOver={isGameOver}
      />

      <p
        className="text-2xl absolute top-8 transition-opacity aria-hidden:opacity-0"
        aria-live="assertive"
        aria-hidden={
          isGameOver ||
          gameState.inGameMessage.lastUpdated <= gameState.year - 1
        }
      >
        {gameState.inGameMessage.text}
      </p>

      <p
        className="font-bold text-4xl mb-6"
        onDoubleClick={() => gameState.endGame()}
      >
        {gameState.year} &middot;{' '}
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(gameState.getCurrentPrice())}
        /kWH
      </p>
      <p className="font-bold text-8xl relative proportional-nums">
        {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
          gameState.getLifetimeEmissions()
        )}{' '}
        tCO<sub>2</sub>
      </p>
      <div className="absolute opacity-0 pointer-events-none" aria-hidden>
        <div ref={scannerRef} />
      </div>
      {
        isGameOver ? (
          <>
            <button
              title="Restart game"
              className="relative rounded-full shadow-dock p-4 bg-white cursor-pointer aspect-ratio-square mt-12"
              onClick={() => gameState.reset()}
            >
              <ArrowRepeat size={64} className="fill-sky-500" />
            </button>
            <nav className="absolute bottom-6 py-5 px-8 shadow-dock rounded-2xl backdrop-blur-lg bg-black/25 text-white text-center">
              <p className="font-bold text-red-400 mb-3 flex items-center justify-center gap-3 uppercase">
                <EmojiFrownFill size={24} />
                Game over
              </p>
              <p className="text-2xl">{gameState.endGameMessage}</p>
            </nav>
          </>
        ) : null
        /*
        <nav className="absolute bottom-8 py-5 px-8 shadow-dock rounded-2xl backdrop-blur-sm bg-white/50 text-black flex flex-col items-center gap-3">
          <div
            className="grid grid-cols-4 gap-8 aria-disabled:opacity-25 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none"
          // aria-disabled={isCapacityOver}
          >
            {Object.entries(gameState.sources).map(([key, source]) => (
              <button
                className="text-center flex flex-col items-center px-2 group cursor-pointer"
                key={key}
                onClick={() => gameState.purchase(key as SourceName)}
              >
                {sourceIcons[key as SourceName] as ReactNode}
                <strong className="font-bold capitalize mt-3">{key}</strong>
                <p className="opacity-60 text-sm font-mono">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0,
                  }).format(source.price)}
                  </p>
              </button>
            ))}
          </div>
          <div
            aria-hidden
            hidden
            className="fill-amber-400 fill-sky-500 fill-black fill-white fill-yellow-900"
          />
        </nav>
        */
      }
    </main>
  )
}

export default Page
