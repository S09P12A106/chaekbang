import React, { useContext, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../../constants/colors'
import { VoteBoardContext } from '../../context/VoteBoardContext'
import { VoteHistoryContext } from '../../context/VoteHistoryContext'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { SocketContext } from '../../../../modules/SocketContext'

// index > 투표 배열 중 선택한 순번
function ResultVote({ index }) {
  const { setWhichVoteContext } = useContext(VoteBoardContext)
  const { voteHistory } = useContext(VoteHistoryContext)
  const { client } = useContext(SocketContext)
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedContent, setSelectedContent] = useState([])
  const [isCreator, setIsCreator] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [mouseIndex, setMouseIndex] = useState(-1)

  // 리덕스에서 가져온 유저정보
  const userInfo = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  // console.log('##########################')
  // console.log(voteHistory)
  // console.log(voteHistory[0])
  // console.log(voteHistory[0][index])

  // 제목이랑 내용 세팅
  useEffect(() => {
    const selectedVote = voteHistory[0][index]
    const title = selectedVote ? selectedVote.title : ''
    const content = selectedVote ? selectedVote.contents : []

    console.log(selectedVote.creator)
    console.log(userInfo.userId)
    // 선택된 투표 창시자와 여기 들어온 사람이랑 같냐?
    selectedVote.creator === 4 ? setIsCreator(true) : setIsCreator(false)

    setSelectedTitle(title)
    setSelectedContent(content)
  }, [])

  // 메인으로 런
  const handleVoteComp = (num) => {
    setWhichVoteContext(num)
  }

  const handleEndVote = () => {
    // voteId 보내주기
    const voteId = voteHistory[0][index].voteId
    try {
      if (client) {
        client.publish({
          destination: `/ws/pub/meeting/1/vote/closeVote/${voteId}`,
        })
      }
    } catch (err) {}
  }

  const handleMouseEnter = (itemIndex) => {
    setTooltipVisible(true)
    setMouseIndex(itemIndex)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
    setMouseIndex(-1)
  }

  return (
    <ResultVoteContainer>
      <Title>{selectedTitle}</Title>
      <ContentBox>
        {selectedContent.map((value, itemIndex) => (
          <div key={itemIndex}>
            <Content
              onMouseEnter={() => handleMouseEnter(itemIndex)}
              onMouseLeave={() => handleMouseLeave(itemIndex)}
            >
              <p>{value}</p>
              {/* 투표 현황 */}
              <Result>{voteHistory[0][index].result[itemIndex].length}</Result>
            </Content>
          </div>
        ))}
        {tooltipVisible && (
          <Tooltip index={index}>
            {voteHistory[0][index].result[mouseIndex].map((value2, index2) => (
              <TooltipInfo key={index2}>
                <Title2>투표한 인원</Title2>
                <People>
                  <img
                    src={value2.profileImage}
                    alt={`Profile of ${value2.nickname}`}
                  />
                  <span>{value2.nickname}</span>
                </People>
              </TooltipInfo>
            ))}
          </Tooltip>
        )}
      </ContentBox>
      {isCreator && (
        <ClosedBtn onClick={() => handleEndVote()}>투표종료하기</ClosedBtn>
      )}
      <BackWardBtn onClick={() => handleVoteComp(0)}>뒤로가기</BackWardBtn>
    </ResultVoteContainer>
  )
}
const Title2 = styled.div`
  margin: 5px;
`
const People = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    border-radius: 100%;
    margin: 10px;
  }
  p {
    font-size: 16px;
  }
`

const Tooltip = styled.div`
  position: absolute;
  top: calc(124px + ${(props) => props.index * 48}px);
  background-color: white;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: auto;
`

const TooltipInfo = styled.div`
  img {
    width: 50px;
    height: 50px;
  }
`

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
`

const Result = styled.div``

const ClosedBtn = styled.button`
  width: 80px;
  height: 36px;
  border-radius: 10px;

  background-color: ${COLORS.RED};
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

export default ResultVote
