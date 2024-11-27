import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick, getTwoDaysFromNow } from '../../utils/time'
const DEFAULT_TARGET_DATE = getTwoDaysFromNow()
interface CountdownProps {
    targetDate: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ targetDate = DEFAULT_TARGET_DATE }) => {
    const [timeRemaining, setTime] = useState<TimeSplit>({
        days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
  })
  tick(targetDate, setTime); 
 
  
    return (
        <div className={`vtex-store-components-3-x-CountDownContainer`}>
            <div className={`vtex-store-components-3-x-CountDownBox`}>
                {timeRemaining.days}
                <p className={`vtex-store-components-3-x-CountDownBoxText`}>Días</p>
            </div>
            <div className={`vtex-store-components-3-x-CountDownBox`}>
                {timeRemaining.hours}
                <p className={`vtex-store-components-3-x-CountDownBoxText`}>Horas</p>
            </div>
            <div className={`vtex-store-components-3-x-CountDownBox`}>
                {timeRemaining.minutes}
                <p className={`vtex-store-components-3-x-CountDownBoxText`}>Min</p>
            </div>
            <div className={`vtex-store-components-3-x-CountDownBox`}>
                {timeRemaining.seconds}
                <p className={`vtex-store-components-3-x-CountDownBoxText`}>Sec</p>
            </div>
      </div>
    )
  }
  Countdown.schema = {
    title: 'editor.countdown.title',
    description: 'editor.countdown.description',
    type: 'object',
    properties: {
        targetDate: {
            title: 'Final date',
            description: 'Final date used in the countdown',
            type: 'string',
            default: null,
        }
    },
  }
  export default Countdown;