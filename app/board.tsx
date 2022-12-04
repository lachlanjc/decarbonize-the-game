import type { ReactNode } from 'react'
import { CONSTANTS, State, type SourceName } from './state'
import { IconCoal, IconGas, IconWind, IconSolar } from './icons'
import { ExclamationTriangleFill, X } from 'react-bootstrap-icons'
import times from 'lodash/times'

const sourceIcons: Record<SourceName, ReactNode> = {
  solar: <IconSolar className="fill-amber-300" size={48} />,
  wind: <IconWind className="fill-white" size={48} />,
  coal: <IconCoal className="fill-black" size={48} />,
  gas: <IconGas className="fill-gray-800" size={48} />,
}

function Board({
  installed,
  addlCapacity = 0,
  isGameOver = false,
}: Pick<State, 'installed'> & { addlCapacity: number; isGameOver: boolean }) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 grid-flow-dense gap-2 bg-sky-700 p-2 rounded-xl shadow-dock absolute top-8 right-8 [min-height:296px]">
      {installed
        .filter((source) => source.active)
        .map(({ source, price, size }, i) => (
          <div
            key={`${source}${price}${i}`}
            title={source}
            className={`bg-sky-400 rounded-lg p-2 flex flex-col items-center justify-center group ${size === 4 ? 'col-span-2' : `col-span-${size}`
              }`}
          >
            {sourceIcons[source]}
          </div>
        ))}
      {times(addlCapacity, (i) => (
        <div
          key={i}
          className={`rounded-lg p-2 aspect-square flex flex-col items-center justify-center border border-sky-100 border-dashed border-4 ${isGameOver ? 'bg-sky-500' : 'animate-pulse even:delay-100'
            }`}
        >
          {isGameOver && <ExclamationTriangleFill className="fill-sky-200" size={32} />}
        </div>
      ))}
      <div className="col-span-1 col-span-2 row-span-2" hidden aria-hidden />
    </div>
  )
}

export default Board
