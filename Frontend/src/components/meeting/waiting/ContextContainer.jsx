import React, { useState } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../constants/colors'

function ContextContainer() {
  // 임시
  const [remainTime, SetRemainTime] = useState(3)

  return (
    <Container>
      <H3>입장까지 {remainTime}분 남았습니다.</H3>
      <H1>참여할 준비가 되셨나요?</H1>
      <Btn>참여하기</Btn>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* margin: 0 20px 0 0; */
`
const H3 = styled.div`
  font-size: 12px;
  margin: 7px 0;
`
const H1 = styled.div`
  font-size: 18px;
`
const Btn = styled.button`
  width: 120px;
  height: 40px;
  font-size: 20px;
  padding: 0 1rem 0 1rem;
  border-radius: 0.75rem;
  background-color: ${COLORS.THEME_COLOR2};
  color: ${COLORS.WHITE};
  margin: 20px;
  &:hover {
    opacity: 90%;
  }
`

export default ContextContainer
