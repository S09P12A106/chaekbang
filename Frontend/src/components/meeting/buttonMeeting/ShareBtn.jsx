import React from 'react'
import SHARE from '../../../assets/meetingbtn/share2.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'

function ShareBtn() {
  return (
    <>
      <BtnCustom BtnImg={SHARE} color={COLORS.LIGHTGREEN}></BtnCustom>
    </>
  )
}

export default ShareBtn
