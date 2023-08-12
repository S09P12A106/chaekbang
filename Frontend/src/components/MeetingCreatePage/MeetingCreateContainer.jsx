import React, { useState } from 'react'
import { styled } from 'styled-components'
import 로고 from '../../assets/로고.png'
import 이름 from '../../assets/이름.png'
import TitleInput from './TitleInput'
import StartDateInput from './StartDateInput'

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`

const LOGO = styled.img`
  height: 80px;
`
const NAME = styled.img`
  height: 70px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
`

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 40px;
`

function MeetingCreateContainer() {
  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState(Date.now())
  const [isValid, setValid] = useState(false)
  const [titleMessage, setTitleMessage] = useState('※ 책방명을 입력해주세요.')
  const [dateMessage, setDateMessage] = useState('※ 시작 시간을 입력해주세요.')

  const onChangeTitle = (e) => {
    const { value } = e.target
    if (value.length === 0) {
      setTitleMessage('※ 책방명을 입력해주세요.')
      setValid(false)
    } else if (value.length > 50) {
      setTitleMessage('※ 책방명을 50자 이내로 입력해주세요.')
      setValid(false)
    } else {
      setTitleMessage('')
      if (dateMessage === '') {
        setValid(true)
      }
      setTitle(value)
    }
  }

  const onChangeDatetime = (e) => {
    const { value } = e.target

    const currentDatetime = new Date()
    const selectedDatetime = new Date(value)

    if (value.length === 0) {
      setDateMessage('※ 시작 시간을 입력해주세요.')
      setValid(false)
    } else if (selectedDatetime < currentDatetime) {
      setDateMessage('※ 현재 시간 이후의 시간을 입력해주세요.')
      setValid(false)
    } else {
      setDateMessage('')
      if (titleMessage === '') {
        setValid(true)
      }
    }
    setDatetime(value)
  }

  const createMeeting = () => {
    const currentDatetime = new Date()
    const selectedDatetime = new Date(datetime)
    if (selectedDatetime < currentDatetime) {
      setDateMessage('※ 현재 시간 이후의 시간을 입력해주세요.')
      setValid(false)
      return
    }

    const postData = {
      title: title,
      data: datetime,
    }

    console.log('미팅 만들기!!')
  }

  return (
    <Container>
      <div>
        <ImageContainer>
          <LOGO src={로고}></LOGO>
          <NAME src={이름}></NAME>
        </ImageContainer>
        <InputContainer>
          <div>
            <TitleInput
              onChangeTitle={onChangeTitle}
              titleMessage={titleMessage}
            ></TitleInput>
            <StartDateInput
              onChangeDatetime={onChangeDatetime}
              dateMessage={dateMessage}
            ></StartDateInput>
            <ButtonContainer>
              {isValid ? (
                <CreateButton onClick={createMeeting}>책방 만들기</CreateButton>
              ) : (
                <NotCreateButton>책방 만들기</NotCreateButton>
              )}
            </ButtonContainer>
          </div>
        </InputContainer>
      </div>
    </Container>
  )
}

export default MeetingCreateContainer
