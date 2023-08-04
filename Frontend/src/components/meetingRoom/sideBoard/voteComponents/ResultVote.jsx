import React, { useContext, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { VoteBoardContext } from '../../context/VoteBoardContext'
import { VoteHistoryContext } from '../../context/VoteHistoryContext'

function ResultVote({ index }) {
  const { whichIndex, setWhichVoteContext } = useContext(VoteBoardContext)
  const { voteHistory } = useContext(VoteHistoryContext)
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedContent, setSelectedContent] = useState([])

  useEffect(() => {
    const selectedVote = voteHistory[index]
    const title = selectedVote ? selectedVote.title : ''
    const content = selectedVote ? selectedVote.contents : []

    setSelectedTitle(title)
    setSelectedContent(content)
  }, [])

  const handleVoteComp = (num) => {
    setWhichVoteContext(num)
  }

  return (
    <ResultVoteContainer>
      <Title>{selectedTitle}</Title>
      <ContentBox>
        {selectedContent.map((value, index) => (
          <div key={index}>
            <Content>
              <p>{value}</p>
              {/* 투표 현황 */}
              <Result>1</Result>
            </Content>
          </div>
        ))}
      </ContentBox>
      <BackWardBtn onClick={() => handleVoteComp(0)}>뒤로가기</BackWardBtn>
    </ResultVoteContainer>
  )
}

const ResultVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 10px;
`

const Title = styled.div`
  width: 180px;
  min-height: 48px;
  border-radius: 10px;
  background-color: ${COLORS.THEME_COLOR2};
  font-size: 20px;
  color: ${COLORS.WHITE};
  border: none;
  padding: 10px;
`
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;

  flex-grow: 1; /* 남은 높이를 모두 차지하도록 설정합니다. */
  width: 180px;

  border-radius: 10px;

  font-size: 20px;
  color: ${COLORS.BRIGHTBLACK};
  border: none;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.BRIGHTBLACK};
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.BRIGHTGREY};
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px ${COLORS.WHITE};
  }
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 180px;
  min-height: 48px;
  background-color: ${COLORS.WHITE};

  align-items: center;

  padding: 10px;

  /* p {
    ma
  }

  input {
    margin-right: 10px;
  } */
`

const Result = styled.div``

const BackWardBtn = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 10px;

  background-color: ${COLORS.RED};
  font-size: 16px;
  color: ${COLORS.WHITE};
`

export default ResultVote
