import React, { useContext } from 'react'
import { styled } from 'styled-components'
import GridScreen from './_GridScreen'
import { useGridSize } from './useGridSize' // 커스텀 훅 가져오기
import CONSOLE from '../../../utils/consoleColors'
import { BoardContext } from '../context/BoardContext'
import { useState } from 'react'

function ScreenShot() {
  CONSOLE.reRender('ScreenShot Rerendered!')
  const { gridRef, screenRef } = useGridSize() // 커스텀 훅 사용
  const { meetingInfoState, currentTime } = useContext(BoardContext)
  const [isRunningTimer, setIsRunningTimer] = useState(false)
  // 숫자를 두 자리 수로 바꾸기 위해
  const transformDouble = (time) => {
    return `${time.toString().padStart(2, '0')}`
  }

  return (
    <Screen ref={screenRef}>
      {/* 추후 추가 */}
      {isRunningTimer && (
        <Times>
          <TimeBar></TimeBar>
          <Hours>{transformDouble(currentTime[0])}</Hours>
          <p>:</p>
          <Minutes>{transformDouble(currentTime[1])}</Minutes>
          <p>:</p>
          <Seconds>{transformDouble(currentTime[2])}</Seconds>
        </Times>
      )}
      <GridScreen grid={gridRef}></GridScreen>
    </Screen>
  )
}

const Screen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 200px);
  padding: 20px;
`

const Times = styled.div`
  transition: absolute;
  left: 12px;
  top: 12px;

  time {
    font-size: 18px;
  }
`

const TimeBar = styled.div``

const Hours = styled.time``
const Minutes = styled.time``
const Seconds = styled.time``

export default ScreenShot
