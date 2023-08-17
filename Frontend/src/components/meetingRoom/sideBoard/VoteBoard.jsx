import React, { useContext, useState, useEffect } from 'react'

import { styled } from 'styled-components'
import MainVote from './voteComponents/MainVote'
import CreateVote from './voteComponents/CreateVote'
import ActiveVote from './voteComponents/ActiveVote'
import ResultVote from './voteComponents/ResultVote'

import { VoteBoardContext } from '../context/VoteBoardContext'
import { VoteHistoryContext } from '../context/VoteHistoryContext'
import COLORS from '../../../constants/colors'
import { BoardContext } from '../context/BoardContext'
import { SocketContext } from '../../../modules/SocketContext'

function VoteBoard() {
  const [whichVoteContext, setWhichVoteContext] = useState(0)
  const [whichIndex, setWhichIndex] = useState(0)
  const [voteHistory, setVoteHistory] = useState([])
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  const { whichBtn, setWhichBtn } = useContext(BoardContext)
  const { voteInfo } = useContext(SocketContext)

  useEffect(() => {
    if (whichBtn === 1) {
      setIsToggleOpen(true)
    } else {
      setIsToggleOpen(false)
    }
  }, [whichBtn])

  // 데이터 받아서 voteHistory에 넣기
  useEffect(() => {
    setVoteHistory([voteInfo])
  }, [voteInfo])

  const VoteBoardComponents = {
    0: <MainVote></MainVote>,
    1: <CreateVote></CreateVote>,
    2: <ActiveVote index={whichIndex}></ActiveVote>,
    3: <ResultVote index={whichIndex}></ResultVote>,
  }
  const VoteBoardInfo = VoteBoardComponents[whichVoteContext]

  return (
    <VoteBoardContext.Provider
      value={{
        whichVoteContext,
        setWhichVoteContext,
        whichIndex,
        setWhichIndex,
      }}
    >
      <VoteHistoryContext.Provider value={{ voteHistory, setVoteHistory }}>
        <VoteBoardContainer toggle={isToggleOpen}>
          {VoteBoardInfo}
        </VoteBoardContainer>
      </VoteHistoryContext.Provider>
    </VoteBoardContext.Provider>
  )
}

const VoteBoardContainer = styled.div`
  position: fixed;
  right: ${(props) => (props.toggle ? '25px' : '-300px')};
  top: 0px;
  transition: right 0.5s ease;
  display: flex;
  width: 270px;
  margin: 10px 0px;
  padding-right: 30px;
  height: calc(100vh - 20px);
  min-height: 450px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: ${COLORS.WHITE};
  margin: 10px;
`

export default VoteBoard
