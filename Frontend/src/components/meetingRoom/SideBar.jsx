import React, { useState } from 'react'
import SideBarBoard from './SideBarBoard'
import { styled } from 'styled-components'
import ChatBtn from './sideBarBtn/ChatBtn'
import VoteBtn from './sideBarBtn/VoteBtn'
import OpBoxBtn from './sideBarBtn/OpBoxBtn'
import TimerBtn from './sideBarBtn/TimerBtn'
import BackwardBtn from './sideBarBtn/BackwardBtn'
import COLORS from '../../constants/colors'
import CommonBtn from './sideBarBtn/CommonBtn'
import { HiOutlineChat } from 'react-icons/hi'
import { MdHowToVote } from 'react-icons/md'
import { LuMailbox } from 'react-icons/lu'
import { LuAlarmClock } from 'react-icons/lu'

function SideBar() {
  const [isOpen, setIsOpen] = useState(true)
  const imgs = [
    { icon: <HiOutlineChat size="30px" />, id: 1 },
    { icon: <MdHowToVote size="30px" />, id: 2 },
    { icon: <LuMailbox size="30px" />, id: 3 },
    { icon: <LuAlarmClock size="30px" />, id: 4 },
  ]

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
          {imgs.map((img, index) => (
            <CommonBtn
              key={img.id}
              onClick={handleToggleOpen}
              icon={img.icon}
              numbering={index}
            />
          ))}
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
