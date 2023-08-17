import React, { useContext } from 'react'
import { BoardContext } from '../context/BoardContext'
import { styled } from 'styled-components'
import VideoButtons from '../../common/VideoButtons'

function BottomBtns({isTogglePossible}) {
  const { toggleMic, toggleCam } = useContext(BoardContext)
  return (
    <>
      <VideoButtons toggleMic={toggleMic} toggleCam={toggleCam} isTogglePossible={isTogglePossible} />
    </>
  )
}

const BtmBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  width: 100%;
`
export default BottomBtns
