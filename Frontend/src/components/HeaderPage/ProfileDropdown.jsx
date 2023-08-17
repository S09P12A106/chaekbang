import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../utils/logout'
import styled from 'styled-components'
import COLORS from '../../constants/colors'
import { logoutAction } from '../../store/LoginUser'
import { clearToken } from '../../utils/tokenUtil'

function ProfileDropdown() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    clearToken()
    dispatch(logoutAction())
    alert('로그아웃 성공')
    navigate('/')
    window.location.reload()
  }

  return (
    <DropdownContainer>
      <DropdownItem>
        <Link to="/mypage">마이페이지</Link>
      </DropdownItem>
      <hr />
      <DropdownItem>
        <Link to="/mygroup">나의 모임</Link>
      </DropdownItem>
      {/* <DropdownItem>
        <Link to="/groups/manage">모임 관리</Link>
      </DropdownItem> */}
      <hr />
      <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
    </DropdownContainer>
  )
}

const DropdownContainer = styled.div`
  position: absolute;
  top: 48px;
  right: 15px;
  padding: 15px 20px;
  width: 160px;
  border-radius: 8px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);

  hr {
    border: none;
    border-top: 1px solid ${COLORS.BRIGHTGREY};
    width: 90%;
    margin: 8px;
  }
`

const DropdownItem = styled.p`
  font-size: 16px;
  padding: 8px;
  color: ${COLORS.GREY};
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.WHITE};
    color: ${COLORS.BLACK};
  }
`
export default ProfileDropdown
