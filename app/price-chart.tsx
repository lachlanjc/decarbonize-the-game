import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts'
import { CONSTANTS } from './state'

type Data = Record<number, number>

function PriceChart({ prices = {} }: { prices: Data }) {
  const data = Object.entries(prices).map(([year, value]) => ({
    year,
    value,
  }))
  const maxPrice = Math.max(...Object.values(prices))
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={1024}
      minWidth={768}
      className={`absolute inset-0 pointer-events-none transition-opacity ${data.length < 4 ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis
          hide
          dataKey="year"
          label="Year"
          // type="number"
          // ticks={Object.keys(emissions)}
          domain={[
            CONSTANTS.gameYearStart,
            CONSTANTS.gameYearStart + CONSTANTS.gameYearSpan,
          ]}
        />
        <YAxis hide domain={[0, maxPrice * 1.5]} />
        <Line
          dataKey="value"
          stroke="white"
          strokeWidth={4}
          type="step"
          dot={false}
          activeDot
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PriceChart
