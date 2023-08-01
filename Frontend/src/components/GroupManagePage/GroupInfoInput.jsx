import React from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  padding-top: 40px;
`

const InfoContainer = styled.div`
  margin-left: 40px;
  line-height: 40px;
  font-size: 15px;
`

const InfoInputContainer = styled.textarea`
  margin-right: 40px;
  width: 500px;
  border-width: 1px;
  border-radius: 5px;
  padding-left: 10px;
  line-height: 37px;
  resize: none;
`

const MessageContainer = styled.div`
  color: #ff2020;
  font-size: 12px;
  padding-left: 10px;
  padding-top: 3px;
`

function GroupInfoInput({ formOption, errorMessage, name, onChange, value }) {
  return (
    <FormContainer>
      <InfoContainer>{formOption.info}</InfoContainer>
      <div>
        <InfoInputContainer
          placeholder={formOption.placeholder}
          style={{ height: formOption.height }}
          onChange={onChange}
          name={name}
          value={value}
        ></InfoInputContainer>
        <MessageContainer>{errorMessage}</MessageContainer>
      </div>
    </FormContainer>
  )
}

export default GroupInfoInput
