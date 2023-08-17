import React, { useContext, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { OpBoxBoardContext } from '../../context/OpBoxBoardContext'
import { OpBoxHistoryContext } from '../../context/OpBoxHistoryContext'

function ResultOpBox({ index }) {
  const { whichIndex, setWhichOpBoxContext } = useContext(OpBoxBoardContext)
  const { opBoxHistory } = useContext(OpBoxHistoryContext)
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedContent, setSelectedContent] = useState([])

  useEffect(() => {
    const selectedOpBox = opBoxHistory[index]
    const title = selectedOpBox ? selectedOpBox.topic : ''
    const content = selectedOpBox ? selectedOpBox.opinions : []

    setSelectedTitle(title)
    setSelectedContent(content)

    console.log('opBoxHistoryinRESSSSSSSSSSSSSSSSSSSSSULT')
    console.log(opBoxHistory)
  }, [])

  const handleOpBoxComp = (num) => {
    setWhichOpBoxContext(num)
  }

  return (
    <ResultOpBoxContainer>
      <Title>{selectedTitle}</Title>
      <ContentBox>
        {selectedContent.map((value, index) => (
          <div key={index}>
            {/* <User>User님의 의견</User> */}
            <Content>
              <p>{value}</p>
            </Content>
          </div>
        ))}
      </ContentBox>
      <BackWardBtn onClick={() => handleOpBoxComp(0)}>뒤로가기</BackWardBtn>
    </ResultOpBoxContainer>
  )
}

const ResultOpBoxContainer = styled.div`
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

const User = styled.div``

const BackWardBtn = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 10px;

  background-color: ${COLORS.RED};
  font-size: 16px;
  color: ${COLORS.WHITE};
`

export default ResultOpBox
