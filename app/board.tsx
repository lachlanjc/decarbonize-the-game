import type { ReactNode } from 'react'
import { type State, type SourceName } from './state'
import { IconCoal, IconGas, IconWind, IconSolar } from './icons'

const sourceIcons: Record<SourceName, ReactNode> = {
  solar: <IconSolar className="fill-amber-300" size={48} />,
  wind: <IconWind className="fill-white" size={48} />,
  coal: <IconCoal className="fill-black" size={48} />,
  gas: <IconGas className="fill-gray-800" size={48} />,
}

const sourceCols: Record<SourceName, number> = {
  solar: 4,
  wind: 2,
  coal: 1,
  gas: 1,
}

function Board({ installed }: Pick<State, 'installed'>) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 [grid-auto-flow:dense] gap-2 bg-sky-700 p-2 rounded-xl shadow-dock absolute top-8 right-8 aspect-square">
      {installed
        .filter((source) => source.active)
        .map(({ source, price, size }, i) => (
          <div
            key={`${source}${price}${i}`}
            title={source}
            className={`bg-sky-400 rounded-lg p-2 flex flex-col items-center justify-center group ${size === 4 ? 'col-span-2 row-span-2' : `col-span-${size}`}`}
          >
            {sourceIcons[source]}
          </div>
        ))}
      <div className="col-span-1 col-span-2 row-span-2" hidden aria-hidden />
    </div>
  )
}

export default Board
