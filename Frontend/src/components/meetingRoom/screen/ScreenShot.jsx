import React, { useEffect, useState, useContext } from 'react'
import { styled } from 'styled-components'
import GridScreen from './_GridScreen'
import { useGridSize } from './useGridSize'
import CONSOLE from '../../../utils/consoleColors'
import { BoardContext } from '../context/BoardContext'

function ScreenShot() {
  CONSOLE.reRender('ScreenShot Rerendered!')
  const { meetingInfoState } = useContext(BoardContext)
  const [members, setMembers] = useState(
    meetingInfoState[0].subscribers.length + 1,
  )
  const { gridRef, screenRef } = useGridSize({ number: members })
  // const [gridRef, setGridRef] = useState()
  // const [screenRef, setScreenRef] = useState()
  // 참가 인원

  useEffect(() => {
    // 참가한 총 인원 수
    setMembers(meetingInfoState[0].subscribers.length + 1)
  }, [meetingInfoState])

  // useEffect(() => {
  //   const { getGridRef, getScreenRef } = useGridSize({ number: members })
  //   setGridRef(getGridRef)
  //   setScreenRef(getScreenRef)
  // }, [members])

  // if (!screenRef || !gridRef) {
  //   return null
  // }
  return (
    <Screen ref={screenRef}>
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

export default ScreenShot
