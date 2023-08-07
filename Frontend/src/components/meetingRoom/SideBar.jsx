import React, { useContext, useState, useEffect } from 'react'
import SideBarBoard from './SideBarBoard'
import { styled } from 'styled-components'
import COLORS from '../../constants/colors'
import CommonBtn from './sideBarBtn/CommonBtn'
import { HiOutlineChat } from 'react-icons/hi'
import { MdHowToVote } from 'react-icons/md'
import { LuMailbox } from 'react-icons/lu'
import { LuAlarmClock } from 'react-icons/lu'
import { BoardContext } from '../meetingRoom/context/BoardContext'
import { AiOutlineArrowRight } from 'react-icons/ai'

function SideBar() {
  const [isOpen, setIsOpen] = useState(true)
  const imgs = [
    { icon: <HiOutlineChat size="30px" />, id: 1 },
    { icon: <MdHowToVote size="30px" />, id: 2 },
    { icon: <LuMailbox size="30px" />, id: 3 },
    { icon: <LuAlarmClock size="30px" />, id: 4 },
  ]

  const { whichBtn, setWhichBtn } = useContext(BoardContext)

  // 버튼 클릭 > 사이드바보드 닫기
  const handleToggleClose = () => {
    setWhichBtn(5)
  }

  // 버튼 클릭 > 사이드바보드 닫기
  const handleToggleOpen = () => {
    // setIsOpen((prevState) => !prevState)
    console.log('clicked')
  }

  useEffect(() => {
    if (whichBtn != 5) setIsOpen(true)
    else setIsOpen(false)
  }, [whichBtn])

  return (
    <>
      <Nav>
        <Btns>
          {/* 접기버튼 */}
          <CloseBtn onClick={handleToggleClose} isOpen={isOpen}>
            <AiOutlineArrowRight size={30}></AiOutlineArrowRight>
          </CloseBtn>

          {/* 기능들이 있는 버튼 */}
          {imgs.map((img, index) => (
            <CommonBtn
              key={img.id}
              onClick={handleToggleOpen}
              icon={img.icon}
              numbering={index}
            />
          ))}
        </Btns>
      </Nav>

      {/* Nav바 누르면 나오는 보드 */}
      <SideBarBoard></SideBarBoard>

      {isOpen && <Space></Space>}
    </>
  )
}

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: calc(100vh - 20px);
  min-height: 450px;
  width: 65px;
  margin: 10px 0px;
  background-color: ${COLORS.WHITE};
  border-top-left-radius: 15px; /* 왼쪽 위 모서리 */
  border-bottom-left-radius: 15px; /* 왼쪽 아래 모서리 */
  z-index: 999;
`

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0px;
`

const CloseBtn = styled.button`
  width: 42.5px;
  height: 42.5px;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: opacity 0.2s ease-in-out;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
`

const Space = styled.div`
  width: 240px;
`

export default SideBar
