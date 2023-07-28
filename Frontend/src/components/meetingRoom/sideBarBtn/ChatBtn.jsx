import React from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../constants/colors'
import { HiOutlineChat } from 'react-icons/hi'

function ChatBtn({ onClick, iconSize }) {
  return (
    <div>
      <Btn onClick={onClick}>
        <Icon size={iconSize} />
      </Btn>
    </div>
  )
}

const Btn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42.5px;
  height: 42.5px;
  background-color: ${COLORS.WHITE};
  border-radius: 50%;
  margin: 12px 0px;
`

const Icon = styled(HiOutlineChat)`
  font-size: ${(props) => props.size || '24px'};
  color: ${COLORS.BLACK};
`

export default ChatBtn
