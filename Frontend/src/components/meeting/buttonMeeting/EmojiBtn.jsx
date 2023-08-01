import React from 'react'
import SMILE from '../../../assets/meetingbtn/smile.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'

function EmojiBtn() {
  return (
    <>
      <BtnCustom BtnImg={SMILE} color={COLORS.YELLOW}></BtnCustom>
    </>
  )
}

export default EmojiBtn
