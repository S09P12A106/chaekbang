import React from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../constants/colors'
import { MdHowToVote } from 'react-icons/md'

function VoteBtn({ onClick, iconSize }) {
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

const Icon = styled(MdHowToVote)`
  font-size: ${(props) => props.size || '24px'};
  color: ${COLORS.BLACK};
`
export default VoteBtn
