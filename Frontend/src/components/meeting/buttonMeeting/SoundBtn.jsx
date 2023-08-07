import React, { useState } from 'react'
import { styled } from 'styled-components'
import MIC from '../../../assets/meetingbtn/mic2.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'

function SoundBtn({ toggleMic }) {
  const [backgroundColor, setBackgroundColor] = useState(COLORS.SKYBLUE)

  const handleClick = () => {
    setBackgroundColor(
      backgroundColor === COLORS.SKYBLUE ? COLORS.GREY : COLORS.SKYBLUE,
    )
    toggleMic()
  }

  return (
    <>
      <BtnCustom BtnImg={MIC} color={backgroundColor} func={handleClick} />
    </>
  )
}

export default SoundBtn
