import React, { useState } from 'react'
import COLORS from '../../constants/colors'
import { styled } from 'styled-components'
import TOGGLEBAR from '../../assets/TOGGLEBAR.png'
import X from '../../assets/X.png'
import { Link } from 'react-router-dom'

function ToggleBtn({ loginImf }) {
  // console.log(loginImf)
  const [isLogin, setIsLogin] = useState(loginImf)
  const [isToggleBarOpen, setIsToggleBarOpen] = useState(false)

  const toggleBar = () => {
    setIsToggleBarOpen((prevState) => !prevState)
  }

  return (
    <>
      <BugerBar>
        <>
          <img src={TOGGLEBAR} onClick={toggleBar} alt="토글버튼" />
          {isToggleBarOpen && <ToggleLayer onClick={toggleBar} />}
          {isToggleBarOpen && (
            <ToggleContainer>
              <img src={X} onClick={toggleBar} alt="X버튼"></img>
              <ToggleBarItemContainer>
                <ToggleBarItem>모임 검색</ToggleBarItem>
                <ToggleBarItem>모임 만들기</ToggleBarItem>
                <hr />
                <ToggleBarItem>마이페이지</ToggleBarItem>
                <hr />
                <ToggleBarItem>나의 모임</ToggleBarItem>
                <ToggleBarItem>모임 관리</ToggleBarItem>
                <hr />
                {isLogin ? (
                  <ToggleBarItem>로그아웃</ToggleBarItem>
                ) : (
                  <ToggleBarItem>
                    <Link to="/login">로그인</Link>
                  </ToggleBarItem>
                )}
              </ToggleBarItemContainer>
            </ToggleContainer>
          )}
        </>
      </BugerBar>
    </>
  )
}

const BugerBar = styled.div`
  display: none;
  position: absolute;
  right: 32px;

  img {
    width: 30px;
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    display: block;
  }
`
const ToggleBarItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  hr {
    border: none;
    border-top: 1px solid ${COLORS.BRIGHTGREY};
    width: 70%;
    margin: 8px;
  }
`

const ToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  right: 0px;
  padding: 15px 20px;
  width: 280px;
  height: 100vh;
  background-color: ${COLORS.WHITE};
  box-shadow:
    -5px 0 10px rgba(0, 0, 0, 0.2),
    -1px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  img {
    position: absolute;
    top: 24px;
    right: 34px;
  }
`

const ToggleBarItem = styled.p`
  font-size: 16px;
  padding: 18px 12px;
  color: ${COLORS.GREY};
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.WHITE};
    color: ${COLORS.BLACK};
  }
`

const ToggleLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 어둡게 설정하는 레이어의 배경색 */
  z-index: 999; /* 다른 컴포넌트보다 위에 오도록 z-index 설정 */
`

export default ToggleBtn
