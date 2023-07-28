import React, { useState } from 'react'
import SideBarBoard from './SideBarBoard'
import { styled } from 'styled-components'
import ChatBtn from './sideBarBtn/ChatBtn'
import VoteBtn from './sideBarBtn/VoteBtn'
import OpBoxBtn from './sideBarBtn/OpBoxBtn'
import TimerBtn from './sideBarBtn/TimerBtn'
import BackwardBtn from './sideBarBtn/BackwardBtn'
import COLORS from '../../constants/colors'

function SideBar() {
  const [isOpen, setIsOpen] = useState(true)

  // 버튼 클릭 > 사이드바보드 닫기
  const handleToggleOpen = () => {
    setIsOpen((prevState) => !prevState)
    console.log('clicked')
  }

  return (
    <>
      <Nav>
        <TopBtn>
          {/* 기능들이 있는 버튼 */}
          {/* <DropDownBtn></DropDownBtn> */}
          <ChatBtn onClick={handleToggleOpen} iconSize="30px"></ChatBtn>
          <VoteBtn onClick={handleToggleOpen} iconSize="30px"></VoteBtn>
          <OpBoxBtn onClick={handleToggleOpen} iconSize="30px"></OpBoxBtn>
          <TimerBtn onClick={handleToggleOpen} iconSize="30px"></TimerBtn>
        </TopBtn>
        <BottomBtn>
          {/* 뒤로가기 버튼 > 디자인 살짝 바뀔 수도 있어서 추후 진행 */}
          <BackwardBtn>5</BackwardBtn>
        </BottomBtn>
      </Nav>

      {/* Nav바 누르면 나오는 보드 */}
      {isOpen && (
        <Board>
          <SideBarBoard></SideBarBoard>
        </Board>
      )}
    </>
  )
}

const Board = styled.div`
  display: flex;
  width: 222px;
  height: calc(100vh-20px);
  background-color: ${COLORS.THEME_COLOR0};
  margin: 10px 0px 10px 10px;
  border-radius: 8px;
`

const Nav = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 10px);
  min-height: 450px;
  width: 65px;
  margin: 5px;
  background-color: ${COLORS.THEME_COLOR2};
  border-radius: 15px;
`

const TopBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0px;
`

const BottomBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0px;
`

export default SideBar
