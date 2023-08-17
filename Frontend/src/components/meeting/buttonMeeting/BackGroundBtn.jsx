import React from 'react'
import STARS from '../../../assets/meetingbtn/stars.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'

function EmojiBtn() {
  return (
    <>
      <BtnCustom BtnImg={STARS} color={COLORS.ORANGE}></BtnCustom>
    </>
  )
}

export default EmojiBtn
