import create from 'zustand'
import sum from 'lodash/sum'
import random from 'lodash/random'

export const CONSTANTS = {
  gameYearStart: 2022,
  gameYearSpan: 50,
} as const

export type SourceName = 'solar' | 'wind' | 'coal' | 'gas'

interface Source {
  source: SourceName
  price: number
  // MWh
  // capacity: number
  // total tCO2e/year
  co2Rate: number
  // Whether it’s active or decommissioned
  active: boolean
  // Number of squares on the board it takes up
  size: number
}

// define types for state values and actions separately
export type State = {
  year: number
  budget: number
  capacityGoal: number
  capacityLastHit: number
  message: string
  installed: Array<Source>
  sources: Record<SourceName, Omit<Source, 'source' | 'active'>>
  emissions: Record<number, number>
}

type Actions = {
  reset: () => void
  tickYear: () => void
  endGame: () => void
  isGameOver: () => boolean
  getCurrentCapacity: () => number
  getYearEmissions: () => number
  getLifetimeEmissions: () => number
  getLifetimeCapacityOfSource: (src: SourceName) => number
  purchase: (src: SourceName) => void
  decomission: (src: SourceName) => void
}

const getInitialEmissions = () =>
  new Array(CONSTANTS.gameYearSpan)
    .fill(0)
    .map((zero, i) => CONSTANTS.gameYearStart + i)
    .reduce((acc, year) => ({ ...acc, [year]: 0 }), {})

const initialState: State = {
  budget: 0,
  year: 2022,
  capacityGoal: 4,
  capacityLastHit: CONSTANTS.gameYearStart,
  message: 'Welcome to Re-electrify!',
  installed: [
    { source: 'coal', price: 0, co2Rate: 25, size: 1, active: true },
    { source: 'gas', price: 0, co2Rate: 15, size: 1, active: true },
    // { source: 'gas', price: 0, co2Rate: 15, active: true },
    { source: 'wind', price: 0, co2Rate: 0, size: 2, active: true },
  ],
  sources: {
    solar: { price: 83, co2Rate: 0, size: 4 },
    wind: { price: 160, co2Rate: 0, size: 2 },
    coal: { price: 350, co2Rate: 22.6, size: 1 },
    gas: { price: 100, co2Rate: 9.7, size: 1 },
  },
  emissions: getInitialEmissions(),
}

// create store
const useGameState = create<State & Actions>((set, get) => ({
  ...initialState,

  isGameOver: () =>
    get().year >= 2022 + CONSTANTS.gameYearSpan ||
    (get().getCurrentCapacity() <= get().capacityGoal &&
      get().capacityLastHit <= get().year - 5),

  getCurrentCapacity: () => get().installed.filter((src) => src.active).length,

  getYearEmissions: () =>
    sum(
      get()
        .installed.filter((src) => src.active)
        .map((source) => source.co2Rate)
    ),

  getLifetimeEmissions: () => sum(Object.values(get().emissions)),

  getLifetimeCapacityOfSource: (srcName: SourceName) =>
    get().installed.filter((src) => src.source === srcName).length,

  purchase: (srcName: SourceName) => {
    // console.log('PURCHASE', srcName)
    const { sources } = get()
    const source = sources[srcName] as Source
    source.source = srcName
    source.active = true

    set(({ budget }) => ({ budget: budget - source.price }))

    if (srcName === 'solar') {
      const capacity = get().getLifetimeCapacityOfSource('solar')
      const scaleFactor = capacity === 1 || capacity % 2 === 1 ? 0.8 : 1
      const price = sources.solar.price * scaleFactor
      set({ sources: { ...sources, solar: { ...sources.solar, price } } })
    }

    set(({ installed }) => ({
      installed: [...installed, source],
    }))
  },

  decomission: (srcName: SourceName) => {
    const source = get().installed.find((src) => src.source === srcName)
    // TODO: set active false
    // source.active = false
    // set({ installed: get().installed.push(source) })
  },

  tickYear: () => {
    const { year, emissions, capacityGoal, isGameOver } = get()
    if (isGameOver()) return
    emissions[year] = get().getYearEmissions()
    if (year + 1 === CONSTANTS.gameYearStart + CONSTANTS.gameYearSpan) {
      set({ message: 'You made it to the end!' })
    }
    set({ year: year + 1, emissions })
    if (get().getCurrentCapacity() >= capacityGoal) {
      set({ capacityLastHit: year, message: 'Capacity goal hit!' })
    } else {
      // capacity not hit
      set({ message: 'You didn’t provide enough electricity to meet demand.' })
    }
    if (year % 8 === 0) {
      set({ capacityGoal: capacityGoal + 1 })
    }
  },

  endGame: () => {
    set({ message: 'Game ended.', year: 2100 })
  },

  reset: () => {
    set(initialState)
    console.log('initial emissions', initialState.emissions)
  },
}))

export default useGameState
