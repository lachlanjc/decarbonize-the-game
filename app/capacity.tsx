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
    <div className="relative w-full flex gap-2 items-center justify-center fill-white pb-4 border-bottom">
      {times(current, (i) => (
        <LightningChargeFill size={24} key={i} />
      ))}
      {times(goal - current, (i) => (
        <LightningCharge size={24} key={i} />
      ))}
      {goal - current >= 1 && currentYear - 1 >= goalLastHit && (
        <span className="absolute right-0 top-2 inline-block bg-amber-500 text-white px-2 text-sm font-mono rounded-md uppercase animate-bounce">
          Install more!
        </span>
      )}
    </div>
  )
}

export default Capacity
