import { useState } from 'react'

export function useHandleTime() {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [second, setSecond] = useState(0)
  const [isOn, setIsOn] = useState(false)

  const handleTime = (num) => {
    const increment = isOn ? 10 : 1

    if (num < 4) {
      switch (num % 3) {
        case 1:
          hour + increment >= 60
            ? setHour(hour + increment - 60)
            : setHour((prevHour) => prevHour + increment)

          break
        case 2:
          minute + increment >= 60
            ? setMinute(minute + increment - 60)
            : setMinute((prevMinute) => prevMinute + increment)

          break
        case 0:
          second + increment >= 60
            ? setSecond(second + increment - 60)
            : setSecond((prevSecond) => prevSecond + increment)

          break
        default:
          break
      }
    } else {
      switch (num) {
        case 4:
          hour - increment <= 0
            ? setHour(hour - increment + 60)
            : setHour((prevHour) => prevHour - increment)
          break
        case 5:
          minute - increment <= 0
            ? setMinute(minute - increment + 60)
            : setMinute((prevMinute) => prevMinute - increment)
          break
        case 6:
          second - increment <= 0
            ? setSecond(second - increment + 60)
            : setSecond((prevSecond) => prevSecond - increment)
          break
        default:
          break
      }
    }
  }
  return {
    hour,
    setHour,
    minute,
    setMinute,
    second,
    setSecond,
    handleTime,
    isOn,
    setIsOn,
  }
}
