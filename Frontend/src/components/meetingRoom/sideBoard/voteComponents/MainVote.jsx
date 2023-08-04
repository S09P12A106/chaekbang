import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { VoteBoardContext } from '../../context/VoteBoardContext'
import { VoteHistoryContext } from '../../context/VoteHistoryContext'

function MainVote() {
  const { setWhichVoteContext, setWhichIndex } = useContext(VoteBoardContext)
  const { voteHistory } = useContext(VoteHistoryContext)

  const handleVoteComp = (num, index) => {
    setWhichIndex(index)
    setWhichVoteContext(num)
  }

  console.log(voteHistory)

  return (
    <VoteContainer>
      <Title>투 표</Title>
      <VoteBox>
        {voteHistory.map((value, index) => (
          <BoxContainer key={index}>
            <Subject>
              <button onClick={() => handleVoteComp(2, index)}>
                {value.title}
              </button>
            </Subject>
          </BoxContainer>
        ))}
        <CreateVote>
          <button onClick={() => handleVoteComp(1)}>+ 투표생성하기</button>
        </CreateVote>
      </VoteBox>
    </VoteContainer>
  )
}

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 10px;
`
const Title = styled.div`
  font-size: 20px;
`
const VoteBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const BoxContainer = styled.div`
  /* margin: 20px 0px; */
`

const Subject = styled.div`
  display: flex;
  /* align-items: center; */
  margin-top: 20px;

  button {
    width: 180px;
    min-height: 48px;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    background-color: ${COLORS.WHITE};
    font-size: 20px;
    color: ${COLORS.BRIGHTBLACK};
  }
`
const State = styled.div``

const CreateVote = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;

  button {
    width: 180px;
    height: 48px;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    background-color: ${COLORS.THEME_COLOR2};
    font-size: 20px;
    color: ${COLORS.WHITE};
  }
`

export default MainVote
