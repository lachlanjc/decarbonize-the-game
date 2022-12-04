import create from 'zustand'
import sum from 'lodash/sum'
import random from 'lodash/random'

export const CONSTANTS = {
  gameYearStart: 2022,
  gameYearSpan: 50,
  maxInstalledSources: 14,
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
  level: number
  year: number
  budget: number
  capacityGoal: number
  capacityLastHit: number
  inGameMessage: {
    text: string
    lastUpdated: number
  }
  endGameMessage: string
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
  level: 1,
  budget: 300,
  year: 2022,
  capacityGoal: 4,
  capacityLastHit: CONSTANTS.gameYearStart,
  inGameMessage: {
    text: 'Welcome to Decarbonize: The Game!',
    lastUpdated: CONSTANTS.gameYearStart,
  },
  endGameMessage: '',
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
      get().capacityLastHit <= get().year - 8) ||
    get().budget < 0,

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

    if (get().installed.length >= CONSTANTS.maxInstalledSources) {
      return set({ inGameMessage: 'The board is full.' })
    }

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
    const { emissions, capacityGoal, sources, isGameOver } = get()
    if (isGameOver()) return

    const year = get().year + 1

    if (year === CONSTANTS.gameYearStart + CONSTANTS.gameYearSpan) {
      set({ endGameMessage: 'You made it to the end!' })
    }

    // if (year === CONSTANTS.gameYearStart + 3) {
    //   set({ inGameMessage: '' })
    // }

    emissions[year] = get().getYearEmissions()
    const addlBudget =
      Math.min(...Object.values(sources).map((src) => src.price)) * 0.7
    set(({ budget }) => ({
      year,
      emissions,
      budget: budget + addlBudget,
    }))

    if (get().getCurrentCapacity() >= capacityGoal) {
      set({
        capacityLastHit: year,
        inGameMessage: { text: 'Nice, hit the capacity.', lastUpdated: year },
      })
    } else {
      // capacity not hit
      set({
        endGameMessage: 'You didn’t provide enough electricity to meet demand.',
      })
    }
    if (year % 8 === 0) {
      set({ capacityGoal: capacityGoal + 1 })
    }
  },

  endGame: () => {
    set({ endGameMessage: 'Game ended.', year: 2100 })
  },

  reset: () => {
    initialState.emissions = getInitialEmissions()
    set(initialState)
    console.log('initial emissions', initialState.emissions)
  },
}))

export default useGameState
