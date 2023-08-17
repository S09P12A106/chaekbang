import React from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../constants/colors'

function BtnCustom({ BtnImg, color, func }) {
  return (
    <>
      <MeetingBTN color={color} onClick={func}>
        <img src={BtnImg} alt="Button Icon" />
      </MeetingBTN>
    </>
  )
}

const MeetingBTN = styled.button`
  position: relative;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  width: 40px;
  height: 40px;
  margin: 7.5px;
  overflow: hidden;
  border: none;

  img {
    width: 65%;
    height: 65%;
    margin-top: 4px;
  }
`

export default BtnCustom
