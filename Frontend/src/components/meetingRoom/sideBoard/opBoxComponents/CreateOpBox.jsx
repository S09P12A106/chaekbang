import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { OpBoxBoardContext } from '../../context/OpBoxBoardContext'
import { OpBoxHistoryContext } from '../../context/OpBoxHistoryContext'

function CreateOpBox() {
  const { setWhichOpBoxContext } = useContext(OpBoxBoardContext)
  const { opBoxHistory, setOpBoxHistory } = useContext(OpBoxHistoryContext)

  const [opBoxTitle, setOpBoxTitle] = useState('')

  const handleOpBoxComp = (num) => {
    setWhichOpBoxContext(num)
  }

  const handleTitleChange = (e) => {
    setOpBoxTitle(e.target.value)
    console.log(opBoxTitle)
  }

  const completeCreate = () => {
    const opBox = {
      title: opBoxTitle,
      state: 'on',
      results: [123],
    }

    setOpBoxHistory([...opBoxHistory, opBox])
    handleOpBoxComp(0)
  }

  return (
    <CreateOpBoxContainer>
      <InputTitle
        value={opBoxTitle}
        onChange={handleTitleChange}
        placeholder="의견 주제"
      />
      <Btns>
        <CancleBtn onClick={() => handleOpBoxComp(0)}>취소하기</CancleBtn>
        <CompleteBtn onClick={() => completeCreate()}>생성완료</CompleteBtn>
      </Btns>
    </CreateOpBoxContainer>
  )
}

const CreateOpBoxContainer = styled.div`
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

export default CreateOpBox
