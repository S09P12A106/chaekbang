import React from 'react'
import { styled } from 'styled-components'

const TitleInputContainer = styled.div``
const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
  padding-top: 50px;
  padding-bottom: 10px;
`
const Input = styled.input`
  width: 400px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #a9a9a9;
  border-radius: 10px;
  padding-right: 10px;
  font-size: 15px;
`

const Message = styled.div`
  color: #ff2020;
  font-size: 15px;
  padding-left: 10px;
  padding-top: 4px;
`

function StartDateInput({ onChangeDatetime, dateMessage }) {
  return (
    <TitleInputContainer>
      <div>
        <Title>시작 시간</Title>
        <Input type={'datetime-local'} onChange={onChangeDatetime}></Input>
        <Message>{dateMessage}</Message>
      </div>
    </TitleInputContainer>
  )
}

export default StartDateInput
