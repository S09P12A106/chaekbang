import React, { useState } from 'react'
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

const InfoInputContainer = styled.div``

const InfoInput = styled.input`
  resize: none;
  line-height: 37px;
  height: 40px;
  border-width: 1px;
  border-radius: 5px;
  margin-right: 40px;
  width: 500px;
  padding-left: 10px;
  margin-bottom: 20px;
`

const RegisteredTagContainer = styled.div`
  background-color: #e0e0e0;
  width: 500px;
  border-width: 1px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
`

const RegisteredTag = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: white;
  color: #00bdc8;
  line-height: 30px;
  font-size: 12px;
  font-weight: 600;
  border-width: 1px;
  border-radius: 10px;
  box-shadow:
    -1px -1px 2px rgba(228, 226, 226, 0.8),
    1px 2px 2px rgba(0, 0, 0, 0.2);
`

const CancelTag = styled.span`
  color: #ff2020;
  font-weight: 600;
  font-size: 12px;
  padding-left: 10px;
  cursor: pointer;
`

const MessageContainer = styled.div`
  color: #ff2020;
  font-size: 12px;
`

function GroupTagInput(props) {
  const [input, setInput] = useState({
    tag: '',
  })

  const [message, setMessage] = useState({
    errorMessage: '',
  })

  const { tag } = input
  const { errorMessage } = message

  const onChangeTag = (e) => {
    const { value, name } = e.target
    setInput({
      [name]: value.replace(/\s+/g, ''),
    })
  }

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      let isDuplicated = false
      for (let idx in props.inputs.tagNames) {
        if (props.inputs.tagNames[idx] === tag) {
          isDuplicated = true
          break
        }
      }
      if (props.inputs.tagNames.length === 5) {
        setMessage({
          errorMessage: '※ 태그는 최대 5개까지 설정 가능합니다.',
        })
        return
      } else if (!tag) {
        setMessage({
          errorMessage: '※ 태그를 입력해주세요.',
        })
        return
      } else if (tag.length > 10) {
        setMessage({
          errorMessage: '※ 태그를 10자 이내로 입력해주세요.',
        })
        return
      } else if (isDuplicated) {
        setMessage({
          errorMessage: '※ 중복된 태그는 설정할 수 없습니다.',
        })
        return
      }

      props.setInputs({
        ...props.inputs,
        ['tagNames']: props.inputs.tagNames.concat(tag),
      })
      setMessage({
        errorMessage: '',
      })
      setInput({
        tag: '',
      })
    }
  }

  const clickCancelTag = (e) => {
    const innerText = e.target.parentNode.innerText.split(' ')[0].slice(1, -1)
    props.setInputs({
      ...props.inputs,
      ['tagNames']: props.inputs.tagNames.filter(
        (tagName) => tagName != innerText,
      ),
    })
    setMessage({
      errorMessage: '',
    })
  }

  return (
    <FormContainer>
      <InfoContainer>태그 입력</InfoContainer>
      <InfoInputContainer>
        <InfoInput
          placeholder={'모임과 관련된 태그를 10자 이내로 입력해주세요.'}
          onChange={onChangeTag}
          onKeyPress={handleOnKeyPress}
          name="tag"
          value={tag}
        ></InfoInput>
        <RegisteredTagContainer>
          {props.inputs.tagNames.map((tagName) => (
            <div key={tagName}>
              <RegisteredTag>
                #{tagName}
                <CancelTag onClick={clickCancelTag}>X</CancelTag>
              </RegisteredTag>
            </div>
          ))}
        </RegisteredTagContainer>
        <MessageContainer>{errorMessage}</MessageContainer>
      </InfoInputContainer>
    </FormContainer>
  )
}

export default GroupTagInput
