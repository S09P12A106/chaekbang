import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { OpBoxBoardContext } from '../../context/OpBoxBoardContext'
import { OpBoxHistoryContext } from '../../context/OpBoxHistoryContext'

function MainOpBox() {
  const { setWhichOpBoxContext, setWhichIndex } = useContext(OpBoxBoardContext)
  const { opBoxHistory } = useContext(OpBoxHistoryContext)

  const handleOpBoxComp = (num, index) => {
    setWhichIndex(index)
    setWhichOpBoxContext(num)
  }

  console.log(opBoxHistory)

  return (
    <OpBoxContainer>
      <Title>의견모집함</Title>
      <OpBoxBox>
        {opBoxHistory &&
          opBoxHistory.map((value, index) => (
            <BoxContainer key={index}>
              <Subject>
                <button onClick={() => handleOpBoxComp(2, index)}>
                  {value.title}
                </button>
              </Subject>
            </BoxContainer>
          ))}
        <CreateOpBox>
          <button onClick={() => handleOpBoxComp(1)}>+ 의견함생성하기</button>
        </CreateOpBox>
      </OpBoxBox>
    </OpBoxContainer>
  )
}

const OpBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 10px;
`
const Title = styled.div`
  font-size: 20px;
`
const OpBoxBox = styled.div`
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

const CreateOpBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0px;

  button {
    width: 180px;
    height: 48px;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(
      45deg,
      ${COLORS.THEME_COLOR2},
      ${COLORS.THEME_COLOR0}
    );
    font-size: 20px;
    color: ${COLORS.WHITE};
  }
`

export default MainOpBox
