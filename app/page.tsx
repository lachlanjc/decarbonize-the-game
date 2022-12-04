'use client'

import { ReactNode, useEffect } from 'react'
import useGameState, { type SourceName } from './state'
import EmissionsChart from './emissions-chart'
import Board from './board'
import Capacity from './capacity'
import { IconCoal, IconGas, IconWind, IconSolar } from './icons'
import { ArrowRepeat, EmojiFrownFill } from 'react-bootstrap-icons'
import useKeypress from 'react-use-keypress'
import useSound from 'use-sound'

import dynamic from 'next/dynamic'
const BarcodeScanner = dynamic(() => import('./scanner'), { ssr: false })

const sourceIcons: Record<SourceName, ReactNode> = {
  solar: <IconSolar className="fill-amber-300" size={52} />,
  wind: <IconWind className="fill-white" size={52} />,
  coal: <IconCoal className="fill-black" size={52} />,
  gas: <IconGas className="fill-gray-800" size={52} />,
}

function Page() {
  const gameState = useGameState()
  if (typeof document != null) {
    // @ts-expect-error
    window.gameState = gameState
  }

  const isGameOver = gameState.isGameOver()
  const currentCapacity = gameState.getCurrentCapacity()
  const isCapacityOver =
    currentCapacity >= gameState.capacityGoal &&
    gameState.capacityLastHit <= gameState.year - 5

  const [playPurchase] = useSound(
    '/sounds/pop-up-off.mp3',
    { volume: 0.5 }
  )

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
      className={`flex full-width min-h-screen flex-col items-center justify-center relative transition-colors ${isGameOver ? 'bg-black' : 'bg-sky-500'
        } text-white`}
    >
      <EmissionsChart emissions={gameState.emissions} />
      <Board
        installed={gameState.installed}
        addlCapacity={gameState.capacityGoal - gameState.getCurrentCapacity()}
        isGameOver={isGameOver}
      />

      <p
        className="text-2xl absolute top-8 transition-opacity aria-hidden:opacity-0"
        aria-live='assertive'
        aria-hidden={gameState.inGameMessage.lastUpdated <= gameState.year - 3}
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
          maximumFractionDigits: 0,
        }).format(gameState.budget < 0 ? 0 : gameState.budget)}{' '}
        remaining
      </p>
      <p className="font-bold text-8xl relative proportional-nums">
        {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
          gameState.getLifetimeEmissions()
        )}{' '}
        tCO<sub>2</sub>
      </p>
      <BarcodeScanner
        onUpdate={(err, result) => {
          if (result) {
            const key = result.getText().toLowerCase()
            if (Object.keys(sourceIcons).includes(key)) {
              console.log('PURCHASING', key)
              gameState.purchase(key as SourceName)
            }
          }
          if (err) {
            console.warn(err)
          }
        }}
        width={1024}
        height={768}
        facingMode="user"
        stopStream={isGameOver}
      />
      {isGameOver ? (
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
      ) : (
        <nav className="absolute bottom-8 py-5 px-8 shadow-dock rounded-2xl backdrop-blur-sm bg-white/50 text-black flex flex-col items-center gap-3">
          {/*
          <Capacity
            current={gameState.getCurrentCapacity()}
            goal={gameState.capacityGoal}
            goalLastHit={gameState.capacityLastHit}
            currentYear={gameState.year}
          />
          */}
          {isCapacityOver && (
            <p className="absolute top-4 left-1/2 -translate-x-1/2 uppercase font-bold text-lg bg-red-500 text-white px-2 rounded-md">
              Grid at capacity
            </p>
          )}
          <div
            className="grid grid-cols-4 gap-8 aria-disabled:opacity-25 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none"
            aria-disabled={isCapacityOver}
          >
            {Object.entries(gameState.sources).map(([key, source]) => (
              <button
                className="text-center flex flex-col items-center px-2 group cursor-pointer"
                key={key}
                onClick={() => gameState.purchase(key as SourceName)}
                onContextMenu={() => gameState.decomission(key as SourceName)}
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
      )}
    </main>
  )
}

export default Page
