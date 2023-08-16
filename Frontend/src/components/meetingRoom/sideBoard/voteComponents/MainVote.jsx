import React, { useContext, useState } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { VoteBoardContext } from '../../context/VoteBoardContext'
import { VoteHistoryContext } from '../../context/VoteHistoryContext'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { BsFillPersonFill } from 'react-icons/bs'
import ActiveBtn from './voteBtn/ActiveBtn'
import ClosedBtn from './voteBtn/ClosedBtn'

function MainVote() {
  const { setWhichVoteContext, setWhichIndex } = useContext(VoteBoardContext)
  const { voteHistory } = useContext(VoteHistoryContext)

  // 리덕스에서 가져온 유저정보
  const userInfo = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  // 투표 생성하기 > createVote로 이동
  const handleVoteComp = (num, index) => {
    setWhichIndex(index)
    setWhichVoteContext(num)
  }

  console.log('voteHistory&&&&&&&&&&&&')
  console.log(voteHistory)

  // 활성화된 투표를 눌렀을 때
  const handleActiveVote = (index) => {
    console.log('userInfo.userId')
    console.log(userInfo.userId) // 15
    console.log(voteHistory[0][index].users)
    const id = 4
    setWhichIndex(index)
    // 투표한 유저들 중 내가 있나? 판단
    const isVote = voteHistory[0][index].users.includes(id)
    // 이미 내가 투표를 완료한 투표면 클릭 시 바로 결과 페이지로
    isVote ? setWhichVoteContext(3) : setWhichVoteContext(2)
    // setWhichVoteContext(2)
  }

  // 투표가 종료된 투표면 결과 페이지로
  const handleClosedVote = (num, index) => {
    setWhichIndex(index)
    setWhichVoteContext(num)
  }

  return (
    <VoteContainer>
      <Title>투 표</Title>
      <VoteBox>
        {voteHistory[0] &&
          voteHistory[0].map((value, index) => (
            <BoxContainer key={index}>
              <Subject>
                {value.active ? (
                  // 투표 진행중인 투표
                  <ActiveBtn
                    value={value}
                    index={index}
                    handleActiveVote={handleActiveVote}
                  />
                ) : (
                  // 결과만 볼 수 있는 투표
                  <ClosedBtn
                    value={value}
                    index={index}
                    handleClosedVote={handleClosedVote}
                  />
                )}
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
  color: ${COLORS.BRIGHTBLACK};
  font-size: 20px;
  text-align: left;
  margin-left: 5px;
`
const Info = styled.div`
  color: ${COLORS.BRIGHTBLACK};
  font-size: 16px;
  text-align: left;
  margin-left: 5px;
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
const ActiveBtn1 = styled.button``

const BTNContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const LeftLine = styled.div`
  width: 12px;
  height: 80px;
  background-color: ${(props) => props.color};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`

const Subject = styled.div`
  display: flex;
  /* align-items: center; */
  margin-top: 20px;

  button {
    width: 180px;
    min-height: 80px;
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
    box-shadow: 2px 2px 4px rgba(126, 126, 126, 0.3);
    background-color: ${COLORS.WHITE};
    font-size: 20px;
    color: ${COLORS.BRIGHTBLACK};
    border-color: ${COLORS.THEME_COLOR2};
  }
`

export default MainVote
