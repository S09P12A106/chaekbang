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
  font-size: 15px;
`

const Message = styled.div`
  color: #ff2020;
  font-size: 15px;
  padding-left: 10px;
  padding-top: 3px;
`

function TitleInput({ onChangeTitle, titleMessage }) {
  return (
    <TitleInputContainer>
      <div>
        <Title>책방명</Title>
        <Input
          placeholder="책방명을 50자 이내로 입력해주세요."
          onChange={onChangeTitle}
        ></Input>
        <Message>{titleMessage}</Message>
      </div>
    </TitleInputContainer>
  )
}

export default TitleInput
