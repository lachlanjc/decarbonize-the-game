import create from 'zustand'
import sum from 'lodash/sum'

export const CONSTANTS = {
  gameYearStart: 2000,
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

export interface LifetimeEmissionsSummary {
  totalCost: number
  landEquivalency: string
}

export type Actions = {
  reset: () => void
  tickYear: () => void
  endGame: () => void
  isGameOver: () => boolean
  isGameOverFromCapacity: () => boolean
  getCurrentCapacity: () => number
  getCurrentPrice: () => number
  getCurrentPriceComparison: () => string
  getYearEmissions: () => number
  getLifetimeEmissions: () => number
  getLifetimeCapacityOfSource: (src: SourceName) => number
  getLifetimeEmissionsSummary: () => LifetimeEmissionsSummary
  purchase: (src: SourceName) => void
}

const getInitialLog = () =>
  new Array(CONSTANTS.gameYearSpan)
    .fill(0)
    .map((zero, i) => CONSTANTS.gameYearStart + i)
    .reduce((acc, year) => ({ ...acc, [year]: null }), {})

const SOURCES = {
  solar: { price: 4, installCO2: 2.8, yearlyCO2: 1, size: 2 },
  wind: { price: 3, installCO2: 1.2, yearlyCO2: 0.074, size: 2 },
  coal: { price: 1, installCO2: 0.5, yearlyCO2: 102, size: 1 },
  gas: { price: 1.25, installCO2: 0.08, yearlyCO2: 46, size: 1 },
} as const

function getRandomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const initialState: State = {
  year: CONSTANTS.gameYearStart,
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
    get().capacityLastHit <= get().year - 10,

  getCurrentCapacity: () => get().installed.length,

  getCurrentPrice: () => {
    const { installed, year, getCurrentCapacity } = get()

    const currentCapacity = getCurrentCapacity()
    const yearsIntoGame = year - CONSTANTS.gameYearStart

    const coalInstalled = installed.filter((src) => src.source === 'coal')
    const coalPriceCurrent =
      SOURCES.coal.price + yearsIntoGame * getRandomBetween(0.1, 0.125)
    const coalPercent = coalInstalled.length / currentCapacity

    const gasInstalled = installed.filter((src) => src.source === 'gas')
    const gasPriceCurrent =
      SOURCES.gas.price + yearsIntoGame * getRandomBetween(0.2, 0.25)
    const gasPercent = gasInstalled.length / currentCapacity

    const solarInstalled = installed.filter((src) => src.source === 'solar')
    const solarPriceCurrent = 1.11 ** (-yearsIntoGame + CONSTANTS.gameYearSpan)
    const solarPercent = solarInstalled.length / currentCapacity

    const windInstalled = installed.filter((src) => src.source === 'wind')
    const windPriceCurrent = 1.0625 ** (-yearsIntoGame + CONSTANTS.gameYearSpan)
    const windPercent = windInstalled.length / currentCapacity

    const generationSourcePrice =
      coalPercent * coalPriceCurrent +
      gasPercent * gasPriceCurrent +
      solarPercent * solarPriceCurrent +
      windPercent * windPriceCurrent

    // console.log({
    //   coalPriceCurrent,
    //   gasPriceCurrent,
    //   solarPriceCurrent,
    //   windPriceCurrent,
    // })

    const unmetDemandMultiplier = get().capacityGoal / installed.length

    return Math.max(
      0.01,
      (generationSourcePrice / 16.5) * unmetDemandMultiplier
    )
  },

  getCurrentPriceComparison: () => {
    const CURRENT_NYC_ELECTRICITY_PRICE = 0.16
    const value = get().getCurrentPrice() / CURRENT_NYC_ELECTRICITY_PRICE
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: value < 1 ? 1 : 0,
    }).format(value)
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

  getLifetimeEmissionsSummary: () => {
    const tCO2e = get().getLifetimeEmissions()
    const REFORESTATION_DOLLARS_PER_TONNE = 50
    const totalCost = REFORESTATION_DOLLARS_PER_TONNE * tCO2e

    const tonnesPerAcre = 2.5
    const acresPerTonne = 1 / tonnesPerAcre
    const acresCovered = tCO2e / acresPerTonne

    const areaEquivalencyData: Record<string, number> = {
      France: 156_352_000,
      Pennsylvania: 29_475_000,
      Connecticut: 3_548_000,
      'Rhode Island': 776_900,
      'Hong Kong': 273_000,
      'San Francisco': 30_000,
      Manhattan: 14_600,
      'Central Park': 843,
      'Vatican City': 109,
      'an American football field': 1.32,
    }

    const areaEquivalencies = Object.values(areaEquivalencyData).map(
      (equivalencyAcres) => Math.round(acresCovered / equivalencyAcres)
    )
    const equivalencyIndex = areaEquivalencies.indexOf(
      areaEquivalencies.filter((equiv) => equiv >= 1).sort()[0] ??
        areaEquivalencies[0]
    )
    const equivalencyNumber = areaEquivalencies[equivalencyIndex]
    const equivalencyValue = Object.keys(areaEquivalencyData)[equivalencyIndex]
    const landEquivalency =
      equivalencyNumber === 1
        ? `around the size of ${equivalencyValue}`
        : `${new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0,
          }).format(equivalencyNumber)}x larger than ${equivalencyValue}`

    return { totalCost, landEquivalency }
  },

  purchase: (srcName: SourceName) => {
    const { sources, year, capacityGoal } = get()

    const source = structuredClone(sources[srcName]) as Source
    source.source = srcName
    source.year = year

    set(({ installed }) => ({
      installed: [...installed, source],
    }))

    const currentCapacity = get().getCurrentCapacity()
    if (currentCapacity >= capacityGoal) {
      set({
        capacityLastHit: year,
        inGameMessage: {
          text:
            currentCapacity > capacityGoal
              ? 'You’ve installed extra capacity.'
              : 'Nice, you fulfilled demand.',
          lastUpdated: year,
        },
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
