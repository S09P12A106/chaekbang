import React, { useContext, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { OpBoxBoardContext } from '../../context/OpBoxBoardContext'
import { OpBoxHistoryContext } from '../../context/OpBoxHistoryContext'
import { getOpBox } from '../../../../api/meetingOpBoxApi'

function MainOpBox() {
  const { setWhichOpBoxContext, setWhichIndex, group_id, meeting_id } =
    useContext(OpBoxBoardContext)
  const { opBoxHistory, setOpBoxHistory } = useContext(OpBoxHistoryContext)

  const handleOpBoxComp = (num, index) => {
    setWhichIndex(index)
    setWhichOpBoxContext(num)
  }

  useEffect(() => {
    const fetchOpBox = async () => {
      getOpBox(group_id, meeting_id)
        .then(({ data }) => {
          setOpBoxHistory(data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    fetchOpBox()
  }, [])

  return (
    <OpBoxContainer>
      <Title>의견모집함</Title>
      <OpBoxBox>
        {opBoxHistory[0] &&
          opBoxHistory.map((value, index) => (
            <BoxContainer key={index}>
              <Subject>
                <button>
                  <TextContainter>
                    <Movement>
                      <PK
                        className="write"
                        onClick={() => handleOpBoxComp(2, index)}
                      >
                        의견쓰기
                      </PK>
                      <PK
                        className="look"
                        onClick={() => handleOpBoxComp(3, index)}
                      >
                        의견보기
                      </PK>
                    </Movement>
                    <Topic>{value.topic}</Topic>
                  </TextContainter>
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
const Topic = styled.div`
  flex: 1;
  width: 80px;
  padding: 5px;
`

const TextContainter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  /* justify-content: center; */
`

const PK = styled.div`
  width: 50px;
  font-size: 12px;
  margin: 5px;
  font-weight: bold;

  &.write {
    color: ${COLORS.BLUE};
  }

  &.look {
    color: ${COLORS.THEME_COLOR2};
  }
`

const Movement = styled.div``

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
    box-shadow: 2px 2px 4px rgba(126, 126, 126, 0.3);
    background-color: ${COLORS.WHITE};
    font-size: 20px;
    color: ${COLORS.BRIGHTBLACK};
    border-color: ${COLORS.THEME_COLOR2};
  }
`

export default MainOpBox
