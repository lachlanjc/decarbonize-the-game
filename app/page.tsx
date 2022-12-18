'use client'

import { useEffect } from 'react'
import useGameState, { CONSTANTS } from './state'
import EmissionsChart from './emissions-chart'
import PriceChart from './price-chart'
import Board from './board'
import { IconCoal, IconGas, IconWind, IconSolar } from './icons'
import {
  ArrowLeft,
  ArrowRepeat,
  CheckCircleFill,
  ChevronLeft,
  EmojiFrownFill,
  LightningCharge,
  ThermometerHalf,
} from 'react-bootstrap-icons'
import useKeypress from 'react-use-keypress'
import useSound from 'use-sound'

import dynamic from 'next/dynamic'
const Scanner = dynamic(() => import('./scanner'), { ssr: false })

function Page() {
  const gameState = useGameState()
  const isGameOver = gameState.isGameOver()
  // const currentCapacity = gameState.getCurrentCapacity()
  // const isCapacityOver =
  //   currentCapacity >= gameState.capacityGoal &&
  //   gameState.capacityLastHit <= gameState.year - 5

  const [playPurchase] = useSound('/sounds/bite.mp3')

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

  return (
    <main
      className={`flex full-width min-h-screen flex-col relative transition-colors ${isGameOver ? 'bg-black' : 'bg-sky-500'
        } text-white p-12`}
    >
      <EmissionsChart emissions={gameState.emissionsLog} />
      <PriceChart prices={gameState.priceLog} />
      <Board
        installed={gameState.installed}
        addlCapacity={gameState.capacityGoal - gameState.getCurrentCapacity()}
        isGameOver={isGameOver}
      />

      <p
        className="font-bold text-4xl mb-4 flex items-center"
        onDoubleClick={() => gameState.endGame()}
      >
        {gameState.year} <LightningCharge size={32} className="ml-8 mr-4" />
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(gameState.getCurrentPrice())}
        /kWH
      </p>
      <p className="flex items-baseline gap-2 font-bold text-8xl relative proportional-nums mb-6">
        <ThermometerHalf size={72} className="-ml-3" />
        {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
          gameState.getLifetimeEmissions()
        )}{' '}
        tons CO<sub>2</sub>
      </p>
      <p
        className="text-2xl transition-opacity aria-hidden:opacity-0"
        aria-live="assertive"
        aria-hidden={
          isGameOver ||
          gameState.inGameMessage.lastUpdated <= gameState.year - 2
        }
      >
        {gameState.inGameMessage.text}
      </p>

      <Scanner onPurchase={playPurchase} />

      {
        isGameOver ? (
          <>
            <button
              title="Restart game"
              className="relative rounded-full shadow-dock p-4 bg-white cursor-pointer aspect-ratio-square m-auto"
              onClick={() => gameState.reset()}
            >
              <ArrowRepeat size={64} className="fill-sky-500" />
            </button>
            <nav className="mt-auto mx-auto mb-6 py-5 px-8 shadow-dock rounded-2xl backdrop-blur-lg bg-black/25 text-white text-center">
              <p className={`font-bold ${gameState.isGameOverFromCapacity() ? 'text-red-400' : 'text-green-400'} mb-3 flex items-center justify-center gap-3 uppercase`}>
                {gameState.isGameOverFromCapacity() ?
                  <>
                    <EmojiFrownFill size={24} />
                    Game over
                  </>
                  :
                  <>
                    <CheckCircleFill size={24} />
                    Game ended
                  </>
                }
              </p>
              <p className="text-2xl">{gameState.endGameMessage}</p>
            </nav>
          </>
        ) : (
          <ChevronLeft
            size={48}
            className={`absolute top-1/2 -translate-y-1/2 left-4 ${gameState.year > CONSTANTS.gameYearStart + 5 &&
              gameState.year < CONSTANTS.gameYearStart + 18
              ? ''
              : 'opacity-0'
              } transition-opacity pulse`}
          />
        )
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
