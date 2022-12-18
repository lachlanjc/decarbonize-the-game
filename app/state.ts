import create from 'zustand'
import sum from 'lodash/sum'

export const CONSTANTS = {
  gameYearStart: 2022,
  gameYearSpan: 50,
  // maxInstalledSources: 14,
  sourceNames: ['solar', 'wind', 'coal', 'gas'],
} as const

export type SourceName = 'solar' | 'wind' | 'coal' | 'gas'

interface Source {
  source: SourceName
  price: number
  // MWh
  // capacity: number
  // total tCO2e/year
  installCO2: number
  yearlyCO2: number
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
  isGameOverFromCapacity: () => boolean
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

const SOURCES = {
  solar: { price: 83, installCO2: 2.8, yearlyCO2: 1, size: 2 },
  wind: { price: 160, installCO2: 1.2, yearlyCO2: 0.074, size: 2 },
  coal: { price: 350, installCO2: 0.5, yearlyCO2: 102, size: 1 },
  gas: { price: 100, installCO2: 0.08, yearlyCO2: 46, size: 1 },
} as const

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
      ...SOURCES.wind,
      source: 'wind',
      year: CONSTANTS.gameYearStart,
    },
    {
      ...SOURCES.coal,
      source: 'coal',
      year: CONSTANTS.gameYearStart,
    },
    {
      ...SOURCES.gas,
      source: 'gas',
      year: CONSTANTS.gameYearStart,
    },
  ],
  sources: SOURCES,
  emissionsLog: getInitialLog(),
  priceLog: getInitialLog(),
}

// create store
const useGameState = create<State & Actions>()((set, get) => ({
  ...initialState,

  isGameOver: () =>
    get().year >= CONSTANTS.gameYearStart + CONSTANTS.gameYearSpan ||
    get().isGameOverFromCapacity(),
  // get().budget < 0,

  isGameOverFromCapacity: () =>
    get().getCurrentCapacity() <= get().capacityGoal - 1 &&
    get().capacityLastHit <= get().year - 9,

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

  getYearEmissions: () => {
    const yearly = sum(get().installed.map((source) => source.yearlyCO2))
    const installation = sum(
      get()
        .installed.filter((src) => src.year === get().year)
        .map((src) => src.installCO2)
    )
    return yearly + installation
  },

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

  tickYear: () => {
    const { capacityGoal, capacityLastHit, isGameOver } = get()
    if (isGameOver()) return

    const priceLog = structuredClone(get().priceLog)
    priceLog[get().year] = get().getCurrentPrice()

    const emissionsLog = structuredClone(get().emissionsLog)
    emissionsLog[get().year] = get().getYearEmissions()

    const year = get().year + 1
    if (year === CONSTANTS.gameYearStart + CONSTANTS.gameYearSpan) {
      set({ endGameMessage: 'You made it to the end!' })
    }

    set({
      year,
      emissionsLog,
      priceLog,
    })

    if (get().getCurrentCapacity() <= capacityGoal) {
      if (capacityLastHit <= year - 8) {
        set({
          endGameMessage:
            'You didn’t install enough electricity to meet demand.',
        })
      }
      if (year === CONSTANTS.gameYearStart + 6) {
        set({ capacityLastHit: year })
      }
      if (year === CONSTANTS.gameYearStart + 6 + 8) {
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

    if (year > CONSTANTS.gameYearStart + 6 && year % 6 === 0) {
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
