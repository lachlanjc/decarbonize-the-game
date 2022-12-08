import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { CONSTANTS } from './state'

type Data = Record<number, number>

function EmissionsChart({ emissions = {} }: { emissions: Data }) {
  const data = Object.entries(emissions).map(([year, value]) => ({
    year,
    value,
  }))
  const maxEmissions = Math.max(...Object.values(emissions))
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={1024}
      minWidth={768}
      className={`absolute inset-0 pointer-events-none transition-opacity ${
        data.length < 4 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          className="stroke-white [stroke-opacity:0.125]"
          numOctaves={CONSTANTS.gameYearSpan}
        />
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
        <YAxis hide domain={[0, maxEmissions * 1.5]} />
        <Area
          // fillOpacity={0.875}
          stackId="1"
          type="monotone"
          dataKey="value"
          // className='fill-white'
          fill="white"
          fillOpacity={0.25}
          stroke="none"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default EmissionsChart
