import { LightningCharge, LightningChargeFill } from 'react-bootstrap-icons'
import times from 'lodash/times'

function Capacity({
  current,
  goal,
  goalLastHit,
  currentYear,
}: {
  current: number
  goal: number
  goalLastHit: number
  currentYear: number
}) {
  return (
    <div className="flex gap-2 items-center justify-center fill-white pb-4 border-bottom">
      {times(current, (i) => (
        <LightningChargeFill size={24} key={i} />
      ))}
      {times(goal - current, (i) => (
        <LightningCharge size={24} key={i} />
      ))}
    </div>
  )
}

export default Capacity
