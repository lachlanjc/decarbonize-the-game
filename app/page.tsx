'use client'

import { ReactNode, useEffect } from 'react'
import useGameState, { type SourceName } from './state'
import EmissionsChart from './emissions-chart'
import Board from './board'
import Capacity from './capacity'
import { IconCoal, IconGas, IconWind, IconSolar } from './icons'
import { ArrowRepeat, EmojiFrownFill } from 'react-bootstrap-icons'

// const sourceColors: Record<SourceName, string> = {
//   solar: 'amber-400',
//   wind: 'sky-500',
//   coal: 'black',
//   gas: 'yellow-900',
// }

const sourceIcons: Record<SourceName, ReactNode> = {
  solar: <IconSolar className="fill-amber-300" size={52} />,
  wind: <IconWind className="fill-white" size={52} />,
  coal: <IconCoal className="fill-black" size={52} />,
  gas: <IconGas className="fill-gray-800" size={52} />,
}

function Page() {
  const gameState = useGameState()
  // @ts-expect-error
  window.gameState = gameState

  const isGameOver = gameState.isGameOver()
  const currentCapacity = gameState.getCurrentCapacity()
  const isCapacityOver = (currentCapacity >= gameState.capacityGoal) && (gameState.capacityLastHit <= gameState.year - 5)

  useEffect(() => {
    const yearTicker = setInterval(() => gameState.tickYear(), 1000)
    return () => {
      clearInterval(yearTicker)
    }
  }, [])

  return (
    <main
      className={`flex full-width min-h-screen flex-col items-center justify-center relative transition-colors ${isGameOver ? 'bg-black' : 'bg-sky-500'
        } text-white`}
    >
      <EmissionsChart emissions={gameState.emissions} />
      <Board installed={gameState.installed} />

      <p
        className="absolute top-8 left-8 font-bold text-3xl"
        onDoubleClick={() => gameState.endGame()}
      >
        {gameState.year}
      </p>
      <p className="font-bold text-8xl relative proportional-nums">
        {new Intl.NumberFormat('en-US').format(
          gameState.getLifetimeEmissions()
        )}{' '}
        tCO<sub>2</sub>
      </p>
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
            <p className="text-2xl">{gameState.message}</p>
          </nav>
        </>
      ) : (
        <nav className="absolute bottom-8 py-5 px-8 shadow-dock rounded-2xl backdrop-blur-sm bg-white/50 text-black flex flex-col items-center gap-3">
          <Capacity
            current={gameState.getCurrentCapacity()}
            goal={gameState.capacityGoal}
            goalLastHit={gameState.capacityLastHit}
            currentYear={gameState.year}
          />
          {isCapacityOver && <p className='absolute top-12 left-1/2 -translate-x-1/2 uppercase font-bold bg-red-500 text-white px-2 rounded-md'>Grid at capacity</p>}
          <div className="grid grid-cols-4 gap-8 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none" aria-disabled={
            isCapacityOver
          }>
            {Object.entries(gameState.sources).map(([key, source]) => (
              <button
                className="text-center flex flex-col items-center px-2 group cursor-pointer"
                key={key}
                onClick={() => gameState.purchase(key as SourceName)}
                onContextMenu={() => gameState.decomission(key as SourceName)}
              >
                {sourceIcons[key as SourceName] as ReactNode}
                <strong className="font-bold capitalize mt-3">{key}</strong>
                <p className="opacity-60 text-sm font-mono">${source.price}</p>
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
