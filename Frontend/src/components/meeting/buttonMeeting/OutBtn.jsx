import React, { useContext } from 'react'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'
import { MdCallEnd } from 'react-icons/md'
import styled from 'styled-components' // Import styled-components properly
import { useNavigate } from 'react-router-dom'
import { BoardContext } from '../../meetingRoom/context/BoardContext'

const OutBtn = () => {
  const navigate = useNavigate()
  const { meetingInfoState } = useContext(BoardContext)

  const session = meetingInfoState[0].session

  const clickevent = () => {
    if (session) {
      session.disconnect()
    }

    window.location.href = '/'
  }

  return (
    <StyledBTN>
      {' '}
      {/* Use the styled component */}
      <MdCallEnd
        onClick={() => clickevent()}
        style={{ fontSize: '36px', marginTop: '2px' }}
      />
    </StyledBTN>
  )
}

const StyledBTN = styled.button`
  position: relative;
  border-radius: 20px;
  background-color: ${COLORS.RED};
  width: 80px;
  height: 40px;
  margin: 7.5px;
  overflow: hidden;
  border: none;

  svg {
    /* Target the SVG icon element */
    font-size: 36px;
    margin-top: 5px;
  }
`

export default OutBtn
