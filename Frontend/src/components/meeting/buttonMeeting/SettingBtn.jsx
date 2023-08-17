import React from 'react'
import SETTING from '../../../assets/meetingbtn/setting.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'

function SettingBtn() {
  return (
    <>
      <BtnCustom BtnImg={SETTING} color={COLORS.PINK}></BtnCustom>
    </>
  )
}

export default SettingBtn
