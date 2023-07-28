import React from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../constants/colors'

function BackwardBtn() {
  return (
    <div>
      <Btn>
        <img src=""></img>
      </Btn>
    </div>
  )
}

const Btn = styled.div`
  width: 42.5px;
  height: 42.5px;
  background-color: ${COLORS.WHITE};
  border-radius: 50%;
  margin: 12px 0px;
`
export default BackwardBtn
