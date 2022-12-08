import create from 'zustand'
import sum from 'lodash/sum'
import groupBy from 'lodash/groupBy'

export const CONSTANTS = {
  gameYearStart: 2022,
  gameYearSpan: 50,
  maxInstalledSources: 14,
  sourceNames: ['solar', 'wind', 'coal', 'gas'],
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
  // active: boolean
  // Number of squares on the board it takes up
  size: number
  // Year it was installed
  year: number
}

// define types for state values and actions separately
export type State = {
  readonly year: number
  // readonly budget: number
  readonly capacityGoal: number
  readonly capacityLastHit: number
  readonly inGameMessage: {
    text: string
    lastUpdated: number
  }
  readonly endGameMessage: string
  readonly installed: Array<Source>
  readonly sources: Record<SourceName, Omit<Source, 'source' | 'year'>>
  readonly emissionsLog: Record<number, number>
  readonly priceLog: Record<number, number>
}

type Actions = {
  reset: () => void
  tickYear: () => void
  endGame: () => void
  isGameOver: () => boolean
  getCurrentCapacity: () => number
  getCurrentPrice: () => number
  getYearEmissions: () => number
  getLifetimeEmissions: () => number
  getLifetimeCapacityOfSource: (src: SourceName) => number
  purchase: (src: SourceName) => void
  // decomission: (src: SourceName) => void
}

const getInitialLog = () =>
  new Array(CONSTANTS.gameYearSpan)
    .fill(0)
    .map((zero, i) => CONSTANTS.gameYearStart + i)
    .reduce((acc, year) => ({ ...acc, [year]: null }), {})

const initialState: State = {
  year: 2022,
  capacityGoal: 3,
  capacityLastHit: CONSTANTS.gameYearStart,
  inGameMessage: {
    text: 'Welcome to Decarbonize: The Game!',
    lastUpdated: CONSTANTS.gameYearStart,
  },
  endGameMessage: '',
  installed: [
    {
      source: 'coal',
      price: 0,
      co2Rate: 25,
      size: 1,
      year: CONSTANTS.gameYearStart,
    },
    {
      source: 'gas',
      price: 0,
      co2Rate: 15,
      size: 1,
      year: CONSTANTS.gameYearStart,
    },
    // { source: 'gas', price: 0, co2Rate: 15, year: CONSTANTS.gameYearStart },
    {
      source: 'wind',
      price: 0,
      co2Rate: 0,
      size: 2,
      year: CONSTANTS.gameYearStart,
    },
  ],
  sources: {
    solar: { price: 83, co2Rate: 0, size: 2 },
    wind: { price: 160, co2Rate: 0, size: 2 },
    coal: { price: 350, co2Rate: 22.6, size: 1 },
    gas: { price: 100, co2Rate: 9.7, size: 1 },
  },
  emissionsLog: getInitialLog(),
  priceLog: getInitialLog(),
}

// create store
const useGameState = create<State & Actions>()((set, get) => ({
  ...initialState,

  isGameOver: () =>
    get().year >= CONSTANTS.gameYearStart + CONSTANTS.gameYearSpan ||
    (get().getCurrentCapacity() <= get().capacityGoal - 1 &&
      get().capacityLastHit <= get().year - 8),
  // get().budget < 0,

  getCurrentCapacity: () => get().installed.length,

  getCurrentPrice: () => {
    const { installed, year } = get()

    const yearMultiplier =
      2 + (year - CONSTANTS.gameYearStart) / CONSTANTS.gameYearSpan
    // const installedCoal = installed.filter((src) => src.source === 'coal')
    // installedCoal.length *

    const unmetDemandMultiplier = get().capacityGoal / installed.length

    return yearMultiplier * unmetDemandMultiplier
  },

  getYearEmissions: () => sum(get().installed.map((source) => source.co2Rate)),

  getLifetimeEmissions: () => sum(Object.values(get().emissionsLog)),

  getLifetimeCapacityOfSource: (srcName: SourceName) =>
    get().installed.filter((src) => src.source === srcName).length,

  purchase: (srcName: SourceName) => {
    const { sources, year } = get()

    // if (get().installed.length >= CONSTANTS.maxInstalledSources) {
    //   return set({
    //     inGameMessage: { text: 'The board is full.', lastUpdated: year },
    //   })
    // }

    const source = structuredClone(sources[srcName]) as Source
    source.source = srcName
    source.year = year
    // source.active = true

    // set(({ budget }) => ({ budget: budget - source.price }))

    if (srcName === 'solar') {
      const capacity = get().getLifetimeCapacityOfSource('solar')
      const scaleFactor = capacity === 1 || capacity % 2 === 1 ? 0.8 : 1
      const price = sources.solar.price * scaleFactor
      set({ sources: { ...sources, solar: { ...sources.solar, price } } })
    }
    // TODO wind learning curve
    if (srcName === 'wind') {
      const capacity = get().getLifetimeCapacityOfSource('wind')
      const scaleFactor = capacity === 1 || capacity % 2 === 1 ? 0.8 : 1
      const price = sources.wind.price * scaleFactor
      set({ sources: { ...sources, wind: { ...sources.wind, price } } })
    }

    set(({ installed }) => ({
      installed: [...installed, source],
    }))

    if (get().getCurrentCapacity() >= get().capacityGoal) {
      set({
        capacityLastHit: year,
        inGameMessage: { text: 'Nice, hit the capacity.', lastUpdated: year },
        endGameMessage: '',
      })
    }
  },

  // decomission: (srcName: SourceName) => {
  // const source = get().installed.find((src) => src.source === srcName)
  // source.active = false
  // set({ installed: get().installed.push(source) })
  // },

  tickYear: () => {
    const { capacityGoal, capacityLastHit, isGameOver } = get()
    if (isGameOver()) return

    const priceLog = structuredClone(get().priceLog)
    priceLog[get().year] = get().getCurrentPrice()

    // if (year === CONSTANTS.gameYearStart + 3) {
    //   set({ inGameMessage: '' })
    // }

    const emissionsLog = structuredClone(get().emissionsLog)
    emissionsLog[get().year] = get().getYearEmissions()
    // const addlBudget =
    // Math.min(...Object.values(sources).map((src) => src.price)) * 0.7

    const year = get().year + 1
    if (year === CONSTANTS.gameYearStart + CONSTANTS.gameYearSpan) {
      set({ endGameMessage: 'You made it to the end!' })
    }

    set({
      year,
      emissionsLog,
      priceLog,
      // budget: budget + addlBudget,
    })

    if (get().getCurrentCapacity() <= capacityGoal) {
      if (capacityLastHit <= year - 8) {
        set({
          endGameMessage:
            'You didn’t install enough electricity to meet demand.',
        })
      }
      if (year === CONSTANTS.gameYearStart + 6) {
        set({
          inGameMessage: {
            text: 'Install another source quickly!',
            lastUpdated: year,
          },
        })
      }
    } else {
      set({ capacityLastHit: year })
    }

    if (year % 6 === 0) {
      set({ capacityGoal: capacityGoal + 1 })
      if (get().installed.length === initialState.installed.length) {
        set({
          inGameMessage: {
            text: 'Time to install an additional source.',
            lastUpdated: year,
          },
        })
      }
    }

    /*
    if (year === CONSTANTS.gameYearStart + 13) {
      // TODO use real numbers
      sources.coal.price += 50
      sources.gas.price += 22
      set({
        inGameMessage: {
          text: 'The UN has set a price of carbon, causing fossil fuel prices to increase.',
          lastUpdated: year,
        },
        sources,
      })
    }
    */
  },

  endGame: () => {
    set({ endGameMessage: 'Game ended.', year: 2100 })
  },

  reset: () => {
    set(initialState)
  },
}))

export default useGameState
