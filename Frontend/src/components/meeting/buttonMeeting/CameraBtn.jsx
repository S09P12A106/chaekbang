import React, { useState } from 'react'
import VIDEO_CAMERA from '../../../assets/meetingbtn/video-camera.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'

function CameraBtn({ toggleCam }) {
  const [backgroundColor, setBackgroundColor] = useState(COLORS.BLUE)

  const handleClick = () => {
    setBackgroundColor(
      backgroundColor === COLORS.BLUE ? COLORS.GREY : COLORS.BLUE,
    )
    toggleCam()
  }
  return (
    <>
      <BtnCustom
        BtnImg={VIDEO_CAMERA}
        color={backgroundColor}
        func={handleClick}
      />
    </>
  )
}

export default CameraBtn
