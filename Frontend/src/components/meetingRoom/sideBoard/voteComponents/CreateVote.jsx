import React, { useContext, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { VoteBoardContext } from '../../context/VoteBoardContext'
// import { VoteHistoryContext } from '../../context/VoteHistoryContext'
// import { BoardContext } from '../../context/BoardContext'
import { SocketContext } from '../../../../modules/SocketContext'

function CreateVote() {
  // const { meetingInfoState } = useContext(BoardContext)
  // const { voteHistory, setVoteHistory } = useContext(VoteHistoryContext)
  const { setWhichVoteContext } = useContext(VoteBoardContext)
  const { client } = useContext(SocketContext)

  const [voteTitle, setVoteTitle] = useState('')
  const [content, setcontent] = useState([])
  const [isOn, setIsOn] = useState(true)

  // 투표 제목
  const handleTitleChange = (e) => {
    setVoteTitle(e.target.value)
  }

  // 항목의 내용을 바꾸면 작동
  const handleOptionChange = (index, value) => {
    const newcontent = [...content]
    newcontent[index] = value
    setcontent(newcontent)
  }

  // 항목 내용 추가하기
  const handleAddOption = () => {
    setcontent([...content, ''])
  }

  // 취소하기
  const handleVoteComp = (num) => {
    // 메인으로 이동하기
    setWhichVoteContext(num)
  }

  // 생성하기
  const completeCreate = () => {
    sendVote()
    handleVoteComp(0)
  }

  // 생성된 항목 보내기
  const sendVote = () => {
    // 히스토리에 저장될 데이터
    const data = {
      title: voteTitle,
      contents: content,
      isAnonymous: isOn,
    }

    // 데이터 소켓으로 보내기
    if (client) {
      client.publish({
        destination: '/ws/pub/meeting/1/vote/createVote',
        body: JSON.stringify(data),
      })
    }
  }

  // 버튼 와따리가따리
  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn)
    console.log(isOn)
  }

  return (
    <CreateVoteContainer>
      <InputTitle
        value={voteTitle}
        onChange={handleTitleChange}
        placeholder="투표 제목"
      />
      {/* 기명/무기명 선택 */}
      <OptionBtn>
        <label>
          <span>{isOn ? '익명' : '기명'}</span>
          <input
            role="switch"
            type="checkbox"
            checked={isOn}
            onChange={handleToggle}
          />
        </label>
      </OptionBtn>
      <InputBox>
        {content.map((info, index) => (
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
  /* justify-content: space-between; */
  input {
    margin: 10px 0px;
  }
`

const InputTitle = styled.input`
  width: 180px;
  min-height: 48px;
  border-radius: 10px;
  /* background-color: ${COLORS.THEME_COLOR2}; */
  background-color: white;
  font-size: 20px;
  color: ${COLORS.BLACK};
  border: '2px solid ${COLORS.THEME_COLOR2}';
  padding: 10px;
  /* border: none; */

  /* &::placeholder {
    color: ${COLORS.WHITE};
  } */
`

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 480px;

  overflow-y: auto;
  padding: 5px;
  box-sizing: border-box;

  div {
    width: 180px;
    height: 48px;
    margin-bottom: 10px; /* 항목간의 아래 간격을 조정 */
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

  margin: 5px;
  padding: 10px;
`

const CreateInput = styled.div`
  button {
    margin-top: 10px;
    width: 180px;
    height: 48px;
    border-radius: 10px;
    background-color: ${COLORS.WHITE};
    font-size: 20px;
    color: ${COLORS.GREY};
  }
`

const Btns = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 240px;
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

const OptionBtn = styled.div`
  border: none;
  display: flex;
  margin-right: 20px;
  margin-left: auto;
  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  [type='checkbox'] {
    appearance: none;
    position: relative;
    border: max(2px, 0.1em) solid gray;
    border-radius: 1.25em;
    width: 2.25em;
    height: 1.25em;
  }
  [type='checkbox']::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: ${COLORS.GREY};
    transition: left 250ms linear;
  }
  [type='checkbox']:checked {
    background-color: ${COLORS.BRIGHTBLACK};
    border-color: ${COLORS.BRIGHTBLACK};
  }
  [type='checkbox']:checked::before {
    background-color: ${COLORS.WHITE};
    left: 1em;
  }
  [type='checkbox']:disabled {
    border-color: ${COLORS.WHITE};
    opacity: 0.7;
    cursor: not-allowed;
  }
  [type='checkbox']:disabled:before {
    background-color: ${COLORS.WHITE};
  }
  [type='checkbox']:disabled + span {
    opacity: 0.7;
    cursor: not-allowed;
  }
  [type='checkbox']:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid tomato;
  }
  [type='checkbox']:enabled:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }
  span {
    text-align: center;
    justify-content: center;
  }
`

export default CreateVote
