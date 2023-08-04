import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { VoteBoardContext } from '../../context/VoteBoardContext'
import { VoteHistoryContext } from '../../context/VoteHistoryContext'

function CreateVote() {
  const { setWhichVoteContext } = useContext(VoteBoardContext)
  const { voteHistory, setVoteHistory } = useContext(VoteHistoryContext)

  const [voteTitle, setVoteTitle] = useState('')
  const [voteInfo, setVoteInfo] = useState([])

  const handleVoteComp = (num) => {
    setWhichVoteContext(num)
  }

  const handleAddOption = () => {
    setVoteInfo([...voteInfo, ''])
  }

  const handleOptionChange = (index, value) => {
    const newVoteInfo = [...voteInfo]
    newVoteInfo[index] = value
    setVoteInfo(newVoteInfo)
  }

  const handleTitleChange = (e) => {
    setVoteTitle(e.target.value)
  }

  const completeCreate = () => {
    const vote = {
      title: voteTitle,
      contents: voteInfo,
      state: 'on',
      results: [],
    }
    setVoteHistory([...voteHistory, vote])
    handleVoteComp(0)
  }

  return (
    <CreateVoteContainer>
      <InputTitle
        value={voteTitle}
        onChange={handleTitleChange}
        placeholder="투표 제목"
      />
      <InputBox>
        {voteInfo.map((info, index) => (
          <div key={index}>
            <InputContent
              value={info}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder="항목 입력"
            />
          </div>
        ))}
        <CreateInput>
          <button onClick={handleAddOption}>+ 항목추가하기</button>
        </CreateInput>
      </InputBox>
      <Btns>
        <CancleBtn onClick={() => handleVoteComp(0)}>취소하기</CancleBtn>
        <CompleteBtn onClick={() => completeCreate()}>생성완료</CompleteBtn>
      </Btns>
    </CreateVoteContainer>
  )
}

const CreateVoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 10px;
  justify-content: space-between;
  input {
    margin: 10px 0px;
  }
`

const InputTitle = styled.input`
  width: 180px;
  min-height: 48px;
  border-radius: 10px;
  background-color: ${COLORS.THEME_COLOR2};
  font-size: 20px;
  color: ${COLORS.WHITE};
  border: none;
  padding: 10px;

  &::placeholder {
    color: ${COLORS.WHITE};
  }
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 500px;

  overflow-y: auto;
  padding: 5px;
  box-sizing: border-box;

  div {
    width: 180px;
    min-height: 48px;
  }

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
const InputContent = styled.input`
  width: 180px;
  min-height: 48px;
  border-radius: 10px;

  background-color: ${COLORS.WHITE};
  font-size: 20px;
  color: ${COLORS.BRIGHTBLACK};
  border: none;

  padding: 10px;
`

const CreateInput = styled.div`
  button {
    width: 180px;
    height: 48px;
    border-radius: 10px;

    background-color: ${COLORS.THEME_COLOR3};
    font-size: 20px;
    color: ${COLORS.WHITE};
    margin-top: 10px;
  }
`

const Btns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`
const CancleBtn = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 10px;

  background-color: ${COLORS.RED};
  font-size: 16px;
  color: ${COLORS.WHITE};
`
const CompleteBtn = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 10px;

  background-color: ${COLORS.BLUE};
  font-size: 16px;
  color: ${COLORS.WHITE};
`

export default CreateVote
