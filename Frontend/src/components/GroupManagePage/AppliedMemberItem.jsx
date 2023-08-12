import React, { useState } from 'react'
import { styled } from 'styled-components'

const Container = styled.div``

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
`

const MemberInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 70%;
  overflow: hidden;
  position: relative;
`

const TextContainer = styled.div`
  margin-left: 40px;
  font-size: 18px;
  line-height: 30px;
  position: relative;
  top: 15%;
`

const Nickname = styled.div`
  font-weight: 600;
`

const Email = styled.div`
  color: #a3a2a2;
`

const Gender = styled.div`
  color: #a3a2a2;
`

const QuestionToggle = styled.div`
  font-size: 14px;
  color: black;
`

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  widht: 100%;
`

const ButtonContainer = styled.div`
  padding-top: 90px;
  display: flex;
`

const ApproveButton = styled.div`
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  background-color: #1f8e94;
  color: white;
  border-radius: 10px;
  width: 60px;
  height: 30px;
  line-height: 30px;
  margin-left: 5px;
`

const DenyButton = styled.div`
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  background-color: #cbf1f5;
  color: black;
  border-radius: 10px;
  width: 60px;
  height: 30px;
  line-height: 30px;
  margin-left: 5px;
`

const DevideLine = styled.hr`
  background: #00bbc6;
  height: 1px;
  border: 0;
  opacity: 0.5;
`

const QuestionContainer = styled.div`
  margin-left: 180px;
  background-color: #cbf1f5;
  margin-bottom: 20px;
  border-radius: 20px 0px 20px 0px / 20px 0px 20px 0px;
`

const Question = styled.div`
  padding-left: 30px;
  padding-top: 30px;
  font-weight: 600;
  font-size: 18px;
`

const Answer = styled.div`
  padding-left: 30px;
  padding-top: 30px;
  font-size: 18px;
  padding-bottom: 30px;
`

function AppliedMemberItem({ user, underLine, onApprove, onDeny, question }) {
  const [questionToggle, setToggle] = useState({
    isOpened: false,
  })

  const { isOpened } = questionToggle

  const toggleQuestion = () => {
    setToggle({
      ['isOpened']: !isOpened, // name 키를 가진 값을 value 로 설정
    })
  }

  return (
    <Container>
      <ContentContainer>
        <MemberInfo>
          <ImageContainer>
            <Image src={user.profileImageUrl}></Image>
          </ImageContainer>
          <TextContainer>
            <Nickname>{user.nickname}</Nickname>
            <Email>{user.email}</Email>
            <Gender>{user.gender === 'M' ? '남성' : '여성'}</Gender>
            {isOpened ? (
              <QuestionToggle onClick={toggleQuestion}>
                질문 답변 닫기 &#9650;
              </QuestionToggle>
            ) : (
              <QuestionToggle onClick={toggleQuestion}>
                질문 답변 열기 &#9660;
              </QuestionToggle>
            )}
          </TextContainer>
        </MemberInfo>
        <ButtonContainer>
          <ApproveButton onClick={() => onApprove(user.id)}>승인</ApproveButton>
          <DenyButton onClick={() => onDeny(user.id)}>거절</DenyButton>
        </ButtonContainer>
      </ContentContainer>
      {isOpened ? (
        <QuestionContainer>
          <Question>Q . {question}</Question>
          <Answer>{user.answer}</Answer>
        </QuestionContainer>
      ) : null}
      {underLine ? <DevideLine></DevideLine> : null}
    </Container>
  )
}

export default AppliedMemberItem
