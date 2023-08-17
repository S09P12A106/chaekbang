import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../utils/logout'
import TOGGLEBAR from '../../assets/TOGGLEBAR.png'
import X from '../../assets/X.png' // x버튼 이미지
import COLORS from '../../constants/colors'
import { logoutAction, setNickname } from '../../store/LoginUser'
import { clearToken } from '../../utils/tokenUtil'

function ToggleBtn() {
  const navigate = useNavigate()
  const [isLogined, setIsLogined] = useState(false)

  const [isToggleBarOpen, setIsToggleBarOpen] = useState(false)
  // Redux Store에서 isLogin 상태 가져오기

  const user = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })
  const dispatch = useDispatch()
  function checkUser() {
    if (user) {
      setIsLogined(true)
    } else {
      setIsLogined(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [user])
  const handleLogout = () => {
    clearToken()
    dispatch(logoutAction())
    alert('로그아웃 성공')
    navigate('/')
    window.location.reload()
  }

  const toggleBar = () => {
    setIsToggleBarOpen((prevState) => !prevState)
  }

  return (
    <BugerBar>
      <img src={TOGGLEBAR} onClick={toggleBar} alt="토글버튼" />
      {isToggleBarOpen && <ToggleLayer onClick={toggleBar} />}

      <ToggleContainer $toggle={isToggleBarOpen}>
        <img src={X} onClick={toggleBar} alt="X버튼"></img>
        <ToggleBarItemContainer>
          <ToggleBarItem>
            <Link to="/search">모임 검색</Link>
          </ToggleBarItem>
          <ToggleBarItem>
            <Link to="/groups/create">모임 만들기</Link>
          </ToggleBarItem>
          <hr />
          <ToggleBarItem>
            <Link to="/mypage">마이페이지</Link>
          </ToggleBarItem>
          <hr />
          <ToggleBarItem>
            <Link to="/mygroup">나의 모임</Link>
          </ToggleBarItem>
          <ToggleBarItem>
            <Link to="/groups/manage">모임 관리</Link>
          </ToggleBarItem>
          <hr />
          {isLogined ? (
            <ToggleBarItem onClick={handleLogout}>로그아웃</ToggleBarItem>
          ) : (
            <ToggleBarItem>
              <Link to="/login">로그인</Link>
            </ToggleBarItem>
          )}
        </ToggleBarItemContainer>
      </ToggleContainer>
    </BugerBar>
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
  right: ${(props) => (props.$toggle ? '0px' : '-280px')};
  padding: 15px 20px;
  width: 280px;
  height: 100vh;
  background-color: ${COLORS.WHITE};
  box-shadow:
    -5px 0 10px rgba(0, 0, 0, 0.2),
    -1px 0 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  transition: all 0.5s ease;

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
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 999;
`

export default ToggleBtn
