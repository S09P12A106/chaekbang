import React from 'react'
import styled from 'styled-components'
import COLORS from '../../../../../constants/colors'
import { BsFillPersonFill } from 'react-icons/bs'

function ClosedBtn({ value, index, handleClosedVote }) {
  const colors = [COLORS.YELLOW, COLORS.BLUE, COLORS.LIGHTGREEN, COLORS.RED]

  return (
    <ClosedBtnContainer onClick={() => handleClosedVote(3, index)}>
      <BTNContainer>
        <LeftLine color={colors[index % colors.length]} />
        <Others>
          <Title>{value.title}</Title>
          <Info>
            <Participate>
              <BsFillPersonFill style={{ marginTop: '3.6px' }} />
              <HowMany>{value.users.length}</HowMany>
            </Participate>
            <State>투표종료</State>
          </Info>
        </Others>
      </BTNContainer>
    </ClosedBtnContainer>
  )
}
const HowMany = styled.div`
  font-size: 17px;
  margin-left: 3px;
`

const Participate = styled.div`
  display: flex;
  flex-direction: row;
`

const State = styled.div`
  color: #ff7c75;
  font-weight: bold;
  font-size: 16px;
`

const Others = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const ClosedBtnContainer = styled.button`
  width: 100%;
`

const Title = styled.div`
  text-align: left;
  font-size: 20px;
  margin: 5px;
  color: gray;
`

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: gray;
  font-size: 16px;
  text-align: left;
  margin: 5px;
`

const BTNContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const LeftLine = styled.div`
  width: 12px;
  height: 100%;
  background-color: ${(props) => props.color};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`

export default ClosedBtn
