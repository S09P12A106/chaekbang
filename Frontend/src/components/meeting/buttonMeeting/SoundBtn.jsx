import React, { useState } from 'react'
import { styled } from 'styled-components'
import MIC from '../../../assets/meetingbtn/mic2.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'
import CONSOLE from '../../../utils/consoleColors'

function SoundBtn({ toggleMic, isTogglePossible }) {
  CONSOLE.reRender('Sound Btn rendered')
  CONSOLE.info(`isTogglePossible: ${isTogglePossible}`)
  const [backgroundColor, setBackgroundColor] = useState(COLORS.SKYBLUE)

  const handleClick = () => {
    if (!isTogglePossible) return
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
