import React from 'react'
import { useState } from 'react'
import { styled } from 'styled-components'
import MainVote from './voteComponents/MainVote'
import CreateVote from './voteComponents/CreateVote'
import ActiveVote from './voteComponents/ActiveVote'
import ResultVote from './voteComponents/ResultVote'

import { VoteBoardContext } from '../context/VoteBoardContext'
import { VoteHistoryContext } from '../context/VoteHistoryContext'

function VoteBoard() {
  const [whichVoteContext, setWhichVoteContext] = useState(0)
  const [whichIndex, setWhichIndex] = useState(0)
  const [voteHistory, setVoteHistory] = useState([])

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
        <VoteBoardContainer>{VoteBoardInfo}</VoteBoardContainer>
      </VoteHistoryContext.Provider>
    </VoteBoardContext.Provider>
  )
}

const VoteBoardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export default VoteBoard
