import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../constants/colors'
import { BoardContext } from '../context/BoardContext'

function CommonBtn({ onClick, icon, numbering }) {
  const { whichBtn, setWhichBtn } = useContext(BoardContext)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    onClick() // 먼저 props로 전달된 onClick 함수를 호출
    setWhichBtn(numbering) // 그 다음 setWhichBtn 함수를 호출
  }

  useEffect(() => {
    if (whichBtn === numbering) setIsClicked(true)
    else setIsClicked(false)
  })

  return (
    <div>
      <Btn onClick={handleClick} isClicked={isClicked}>
        <IconWrapper>
          <Icon icon={icon} />
        </IconWrapper>
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
  border-radius: 50%;
  margin: 12px 0px;

  background-color: ${(props) => (props.isClicked ? '#bfbfbf' : 'white')};

  :hover {
    background-color: #dcdcdc;
  }
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`

const Icon = styled(({ icon }) => icon)`
  font-size: 24px;
  color: ${COLORS.BLACK};
`

export default CommonBtn
