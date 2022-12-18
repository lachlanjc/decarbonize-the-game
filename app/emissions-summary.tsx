import type { LifetimeEmissionsSummary } from './state'

function EmissionsSummary({
  totalCost,
  landEquivalency,
}: LifetimeEmissionsSummary) {
  return (
    <>
      Planting trees to absorb this carbon would cover an area {landEquivalency}{' '}
      and cost{' '}
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(totalCost)}
      .
    </>
  )
}

export default EmissionsSummary
