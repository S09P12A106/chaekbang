import React, { useState } from 'react'
import styled from 'styled-components'
import MainLayout from '../components/Layout/MainLayout'
import GroupInfoInput from '../components/GroupCreatePage/GroupInfoInput'
import GroupTagInput from '../components/GroupCreatePage/GroupTagInput'

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

function GroupCreatePage() {
  const [inputs, setInputs] = useState({
    title: '',
    detail: '',
    question: '',
    tagNames: [],
  })

  const [errorMessages, setMessages] = useState({
    titleMessage: '※ 모임 이름을 입력해주세요.',
    detailMessage: '※ 모임 소개를 입력해주세요.',
    questionMessage: '※ 모임 질문을 입력해주세요.',
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
    console.log(inputs)
    console.log('모임 만들기')
  }

  return (
    <MainLayout>
      <Container>
        <GroupInfoInput
          limitNum={30}
          errorMessage={titleMessage}
          info={'모임 이름'}
          placeholder={'모임 이름을 30자 이내로 입력해주세요.'}
          height={40}
          onChange={onChangeTitle}
          name={'title'}
        ></GroupInfoInput>
        <HrTag></HrTag>
        <GroupInfoInput
          info={'모임 소개'}
          errorMessage={detailMessage}
          placeholder={'모임에 대한 소개를 입력해주세요.'}
          height={320}
          onChange={onChangeDetail}
          name={'detail'}
        ></GroupInfoInput>
        <HrTag></HrTag>
        <GroupTagInput
          setInputs={setInputs}
          inputs={inputs}
          tagNames={tagNames}
        ></GroupTagInput>
        <HrTag></HrTag>
        <GroupInfoInput
          limitNum={100}
          errorMessage={questionMessage}
          info={'가입 질문 입력'}
          placeholder={
            '모임 가입자들에게 물어볼 질문을 100자 이내로 입력해주세요.'
          }
          height={130}
          onChange={onChangeQuestion}
          name={'question'}
        ></GroupInfoInput>

        <TextContainer>
          {isValid ? (
            <GreenText>&#10003;</GreenText>
          ) : (
            <RedText>&#10003;</RedText>
          )}

          <GrayText>
            바로 등록하시겠습니까? 모임 설정 페이지에서 모임 정보를 수정할 수
            있습니다.
          </GrayText>
        </TextContainer>
        <ButtonContainer>
          {isValid ? (
            <CreateButton onClick={createGroup}>모임 만들기</CreateButton>
          ) : (
            <NotCreateButton>모임 만들기</NotCreateButton>
          )}
        </ButtonContainer>
      </Container>
    </MainLayout>
  )
}

export default GroupCreatePage
