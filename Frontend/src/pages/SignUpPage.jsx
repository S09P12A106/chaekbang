import React, { useState } from 'react'
import styled from 'styled-components'
import LogoImg from '../components/LoginPage/LogoImg'
import COLORS from '../constants/colors'
import InputCompo from '../components/Input/InputCompo'

function SignUpPage() {
  const [activeMale, setActiveMale] = useState(false)
  const [activeFemale, setActiveFemale] = useState(false)

  function activeBtnM() {
    setActiveMale(!activeMale)
    setActiveFemale(false)
  }

  function activeBtnF() {
    setActiveFemale(!activeFemale)
    setActiveMale(false)
  }

  return (
    <>
      <Container className="container">
        <PageContainer>
          <LogoImg marginButtonRem={1} />
          <SignUpContext>
            <H3>닉네임</H3>
            <InputCompo placeholder="닉네임을 입력해주세요" />
            <H3>생년월일 8자리</H3>
            <InputCompo placeholder="생년월일 8자리를 입력해주세요" />
            <H3>성별</H3>
            <SignUpGender isActive={{ male: activeMale, female: activeFemale }}>
              <button className="maleBtn" onClick={activeBtnM}>
                남자
              </button>
              <button className="femaleBtn" onClick={activeBtnF}>
                여자
              </button>
            </SignUpGender>
            <H3>자신을 소개해주세요</H3>
            <StyledTextarea placeholder="100글자 이내로 작성해주세요."></StyledTextarea>
          </SignUpContext>
          <SignUPButton>회원가입</SignUPButton>
        </PageContainer>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%; /* 가로 길이를 80%로 설정 */
`

const SignUpContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const H3 = styled.h3`
  font-size: 20px;
  color: ${COLORS.BLACK};
  margin: 25px 0 5px;
`

const SignUpGender = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 45%;
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem 0 1rem;
    border-radius: 0.75rem;
    border: 1px solid ${COLORS.BLACK};
    background-color: ${COLORS.THEME_COLOR2};
    color: ${COLORS.BLACK};
  }
  button:hover {
    background-color: ${COLORS.THEME_COLOR2};
    border: none;
    color: ${COLORS.WHITE};
  }
  .maleBtn {
    background-color: ${(props) =>
      props.isActive.male ? COLORS.THEME_COLOR2 : COLORS.WHITE};
    color: ${(props) => (props.isActive.male ? COLORS.WHITE : COLORS.BLACK)};
    border: ${(props) =>
      props.isActive.male ? 'none' : '1px solid ${COLORS.BLACK}'};
  }
  .femaleBtn {
    background-color: ${(props) =>
      props.isActive.female ? COLORS.THEME_COLOR2 : COLORS.WHITE};
    color: ${(props) => (props.isActive.female ? COLORS.WHITE : COLORS.BLACK)};
    border: ${(props) =>
      props.isActive.female ? 'none' : '1px solid ${COLORS.BLACK}'};
  }
`

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 10rem;
  font-size: 1rem;
  padding: 1.25rem;
  border-radius: 1rem;
  resize: none;
  border-color: ${COLORS.BLACK};
  &::placeholder {
    color: ${COLORS.GREY};
  }
`

const SignUPButton = styled.button`
  width: 100%;
  height: 3rem;
  padding: 0 1.25rem 0 1.25rem;
  margin: 25px 0 5px;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  background-color: ${COLORS.THEME_COLOR2};
  color: ${COLORS.WHITE};
  letter-spacing: 0.1rem; /* 글자간격 */
  &:hover {
    opacity: 0.9;
  }
`

export default SignUpPage
