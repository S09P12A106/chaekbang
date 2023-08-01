import React, { useContext } from 'react'
import ChatBoard from './sideBoard/ChatBoard'
import VoteBoard from './sideBoard/VoteBoard'
import OpBoxBoard from './sideBoard/OpBoxBoard'
import TimerBoard from './sideBoard/TimerBoard'
import { BoardContext } from './context/BoardContext'
import styled from 'styled-components'

function SideBarBoard() {
  const { whichBtn, setWhichBtn } = useContext(BoardContext)

  const BoardComponents = {
    0: <ChatBoard></ChatBoard>,
    1: <VoteBoard></VoteBoard>,
    2: <OpBoxBoard></OpBoxBoard>,
    3: <TimerBoard></TimerBoard>,
  }
  const BoardInfo = BoardComponents[whichBtn]

  return <SideBarBoardContainer>{BoardInfo}</SideBarBoardContainer>
}

const SideBarBoardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export default SideBarBoard
