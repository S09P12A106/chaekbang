import React from 'react'
import { useSelector } from 'react-redux' // react-redux에서 useSelector 가져오기
import styled from 'styled-components'
import COLORS from '../../constants/colors'

function ProfileDropdown() {
  return (
    <DropdownContainer>
      <DropdownItem>마이페이지</DropdownItem>
      <hr></hr>
      <DropdownItem>나의 모임</DropdownItem>
      <DropdownItem>모임 관리</DropdownItem>
      <hr></hr>
      <DropdownItem>로그아웃</DropdownItem>
      {/* 여기에 다른 Dropdown 메뉴 아이템을 추가할 수 있습니다 */}
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
