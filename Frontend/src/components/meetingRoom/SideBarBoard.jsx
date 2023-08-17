import React, { useContext, useEffect, useState } from 'react'
import ChatBoard from './sideBoard/ChatBoard'
import VoteBoard from './sideBoard/VoteBoard'
import OpBoxBoard from './sideBoard/OpBoxBoard'
import TimerBoard from './sideBoard/TimerBoard'
import { BoardContext } from './context/BoardContext'
import styled from 'styled-components'

function SideBarBoard() {
  const { whichBtn, setWhichBtn } = useContext(BoardContext)

  return (
    <>
      <ChatBoard></ChatBoard>
      <VoteBoard></VoteBoard>
      <OpBoxBoard></OpBoxBoard>
      <TimerBoard></TimerBoard>
    </>
  )
}

export default SideBarBoard
