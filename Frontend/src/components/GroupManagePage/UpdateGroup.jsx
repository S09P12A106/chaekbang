import React, { useState } from 'react'
import styled from 'styled-components'
import GroupInfoInput from './GroupInfoInput'
import GroupTagInput from './GroupTagInput'
import { getGroup } from './GroupDummy'
import Swal from 'sweetalert2'

const Container = styled.div`
  max-width: 960px;
  margin-left: 50px;
  margin-right: 50px;
`

const HrTag = styled.hr`
  background: #e3e3e3;
  height: 1px;
  border: 0;
`

const TextContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

const GrayText = styled.div`
  font-size: 15px;
  color: #7b7b7b;
`

const RedText = styled.div`
  margin-right: 20px;
  font-size: 15px;
  color: #ff0000;
`

const GreenText = styled.div`
  margin-right: 20px;
  font-size: 15px;
  color: #088a08;
`

const CreateButton = styled.div`
  background-color: #00bbc6;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
  cursor: pointer;
`

const NotCreateButton = styled.div`
  background-color: #93c5c8;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  color: #f1f1f1;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursur: pointer;
`

function UpdateGroup() {
  const dummy = getGroup()

  const [inputs, setInputs] = useState({
    title: dummy.title,
    detail: dummy.detail,
    question: dummy.question,
    tagNames: dummy.tagNames,
  })

  const [errorMessages, setMessages] = useState({
    titleMessage: '',
    detailMessage: '',
    questionMessage: '',
  })

  const [isValid, setValid] = useState(false)

  const { title, detail, question, tagNames } = inputs
  const { titleMessage, detailMessage, questionMessage } = errorMessages

  const onChangeTitle = (e) => {
    const { value, name } = e.target
    if (value.length == 0) {
      setMessages({
        ...errorMessages,
        ['titleMessage']: '※ 모임 이름을 입력해주세요.',
      })
      setValid(false)
    } else if (value.length > 30) {
      setMessages({
        ...errorMessages,
        ['titleMessage']: '※ 모임 이름을 30자 이내로 입력해주세요.',
      })
      setValid(false)
    } else {
      setMessages({
        ...errorMessages,
        ['titleMessage']: '',
      })
      if (detailMessage === '' && questionMessage === '') {
        setValid(true)
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onChangeDetail = (e) => {
    const { value, name } = e.target
    if (value.length == 0) {
      setMessages({
        ...errorMessages,
        ['detailMessage']: '※ 모임 소개를 입력해주세요.',
      })
      setValid(false)
    } else {
      setMessages({
        ...errorMessages,
        ['detailMessage']: '',
      })
      if (questionMessage === '' && titleMessage === '') {
        setValid(true)
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const onChangeQuestion = (e) => {
    const { value, name } = e.target
    if (value.length == 0) {
      setMessages({
        ...errorMessages,
        ['questionMessage']: '※ 모임 질문을 입력해주세요.',
      })
      setValid(false)
    } else if (value.length > 100) {
      setMessages({
        ...errorMessages,
        ['questionMessage']: '※ 질문을 100자 이내로 입력해주세요.',
      })
      setValid(false)
    } else {
      setMessages({
        ...errorMessages,
        ['questionMessage']: '',
      })
      if (detailMessage === '' && titleMessage === '') {
        setValid(true)
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  const createGroup = () => {
    Swal.fire({
      title: '수정을 완료하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('수정')
      }
    })
  }

  const formOptions = {
    title: {
      info: '모임 이름',
      placeholder: '모임 이름을 30자 이내로 입력해주세요.',
      height: 40,
    },
    detail: {
      info: '모임 소개',
      placeholder: '모임에 대한 소개를 입력해주세요.',
      height: 320,
    },
    question: {
      info: '가입 질문',
      placeholder: '모임 가입자들에게 물어볼 질문을 100자 이내로 입력해주세요.',
      height: 130,
    },
  }

  return (
    <Container>
      <GroupInfoInput
        formOption={formOptions.title}
        errorMessage={titleMessage}
        onChange={onChangeTitle}
        name={'title'}
        value={title}
      ></GroupInfoInput>
      <HrTag></HrTag>
      <GroupInfoInput
        formOption={formOptions.detail}
        errorMessage={detailMessage}
        onChange={onChangeDetail}
        name={'detail'}
        value={detail}
      ></GroupInfoInput>
      <HrTag></HrTag>
      <GroupTagInput
        setInputs={setInputs}
        inputs={inputs}
        tagNames={tagNames}
      ></GroupTagInput>
      <HrTag></HrTag>
      <GroupInfoInput
        errorMessage={questionMessage}
        formOption={formOptions.question}
        onChange={onChangeQuestion}
        name={'question'}
        value={question}
      ></GroupInfoInput>

      <ButtonContainer>
        {isValid ? (
          <CreateButton onClick={createGroup}>모임 수정하기</CreateButton>
        ) : (
          <NotCreateButton>모임 수정하기</NotCreateButton>
        )}
      </ButtonContainer>
    </Container>
  )
}

export default UpdateGroup
