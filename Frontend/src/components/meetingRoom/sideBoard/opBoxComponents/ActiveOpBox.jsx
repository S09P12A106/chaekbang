import React, { useContext, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { OpBoxBoardContext } from '../../context/OpBoxBoardContext'
import { OpBoxHistoryContext } from '../../context/OpBoxHistoryContext'

function ActiveOpBox({ index }) {
  const { whichIndex, setWhichOpBoxContext } = useContext(OpBoxBoardContext)
  const { opBoxHistory } = useContext(OpBoxHistoryContext)
  const [selectedTitle, setSelectedTitle] = useState('')
  const [opBoxContent, setOpBoxContent] = useState('')

  useEffect(() => {
    const selectedOpBox = opBoxHistory[index]
    const title = selectedOpBox ? selectedOpBox.title : ''

    setSelectedTitle(title)
  }, [])

  const handleOpBoxComp = (num) => {
    setWhichOpBoxContext(num)
  }

  // 입력하면 값 저장
  const handleContentChange = (e) => {
    setOpBoxContent(e.target.value)
  }

  return (
    <ActiveOpBoxContainer>
      <Title>{selectedTitle}</Title>
      <ContentBox>
        <Content>
          <TextArea
            value={opBoxContent}
            onChange={handleContentChange}
            placeholder="의견을 입력해주세요"
          ></TextArea>
        </Content>

        <CompleteBtn onClick={() => handleOpBoxComp(3)}>
          의견 보내기
        </CompleteBtn>
      </ContentBox>
      <BackWardBtn onClick={() => handleOpBoxComp(0)}>뒤로가기</BackWardBtn>
    </ActiveOpBoxContainer>
  )
}

const ActiveOpBoxContainer = styled.div`
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

  flex-grow: 1;
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
  width: 100%;
  padding: 10px;
`

const TextArea = styled.textarea`
  font-size: 1rem;
  width: 100%;
  height: 200px;
  padding: 1.25rem;
  border-radius: 1rem;
  resize: none;
  outline-color: ${COLORS.BLACK};

  ::placeholder {
    color: ${COLORS.BRIGHTBLACK};
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

const CompleteBtn = styled.button`
  width: 100px;
  height: 36px;
  border-radius: 10px;
  margin-top: 10px;
  background-color: ${COLORS.BLUE};
  font-size: 16px;
  color: ${COLORS.WHITE};
`
const BackWardBtn = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 10px;

  background-color: ${COLORS.RED};
  font-size: 16px;
  color: ${COLORS.WHITE};
`

export default ActiveOpBox
