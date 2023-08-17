import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import LogoImg from '../components/LoginPage/LogoImg'
import COLORS from '../constants/colors'
import InputCompo from '../components/LoginPage/InputCompo'
import { useLocation, useNavigate } from 'react-router-dom'
import { signUpApi } from '../api/authApi'
import { saveToken } from '../utils/tokenUtil'
import { getUserInfoApi } from '../api/userApi'
import { loginAction } from '../store/LoginUser'
import { useDispatch } from 'react-redux'

const SignUpPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeMale, setActiveMale] = useState(false)
  const [activeFemale, setActiveFemale] = useState(false)
  const [nickName, setNickName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [errorMessageNickName, setErrorMessageNickName] = useState('')
  const [errorMessageAbout, setErrorMessageAbout] = useState('')

  function activeBtnM() {
    setActiveMale(!activeMale)
    setActiveFemale(false)
  }

  function activeBtnF() {
    setActiveFemale(!activeFemale)
    setActiveMale(false)
  }

  // 선택된 성별
  function whichGender() {
    return activeFemale ? 'F' : 'M'
  }

  // 닉네임 2~20자 이내 검증
  useEffect(() => {
    nickName.length > 20
      ? setErrorMessageNickName('20자 이내로 작성해주세요.')
      : setErrorMessageNickName('')
  }, [nickName])

  // 자기 소개 100자 이내 검증
  useEffect(() => {
    aboutMe.length > 100
      ? setErrorMessageAbout('100자 이내로 작성해주세요.')
      : setErrorMessageAbout('')
  }, [aboutMe])

  // API 통신
  const axiosSignUp = async () => {
    if (!aboutMe.length || !setErrorMessageAbout) return
    if (!birthday) return
    if (!nickName.length || !setErrorMessageNickName) return
    if (!activeMale && !activeFemale) return
    const { idToken, oauthProvider } = location.state
    const requestBody = {
      idToken,
      oauthProvider,
      nickname: nickName,
      gender: whichGender(),
      birth: birthday,
      aboutMe,
    }
    try {
      const response = await signUpApi(requestBody)
      const { accessToken, refreshToken } = response.data
      // 로컬 스토리지에 토큰 저장
      saveToken(accessToken, refreshToken)

      const userInfo = await getUserInfoApi()
      dispatch(loginAction(userInfo.data))

      alert(`반갑습니다 ${nickName} 님!`)
      navigate('/')
    } catch (error) {
      navigate('/error')
    }
  }

  return (
    <Container className="container">
      <PageContainer>
        <LogoImg marginButtonRem={1} />
        <SignUpContext>
          <H3>닉네임</H3>
          <InputCompo
            value={nickName}
            callback={(e) => setNickName(e.target.value)}
            placeholder="닉네임을 입력해주세요"
          />
          {errorMessageNickName ? (
            <ErrorText>{errorMessageNickName}</ErrorText>
          ) : (
            <Space />
          )}
          <H3>생년월일 8자리</H3>
          <InputCompo
            type="date"
            id="birthday"
            value={birthday}
            callback={(e) => setBirthday(e.target.value)}
            placeholder="생년월일 8자리를 입력해주세요"
          />
          <Space />
          <H3>성별</H3>
          <SignUpGender $isActive={{ male: activeMale, female: activeFemale }}>
            <button className="maleBtn" onClick={activeBtnM}>
              남자
            </button>
            <button className="femaleBtn" onClick={activeBtnF}>
              여자
            </button>
          </SignUpGender>
          <Space />
          <H3>자신을 소개해주세요</H3>
          <StyledTextarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="100글자 이내로 작성해주세요."
          ></StyledTextarea>
          {errorMessageAbout ? (
            <ErrorText>{errorMessageAbout}</ErrorText>
          ) : (
            <Space />
          )}
        </SignUpContext>
        <SignUPButton onClick={axiosSignUp}>회원가입</SignUPButton>
      </PageContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-width: 540px;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`
const SignUpContext = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const H3 = styled.h3`
  font-size: 20px;
  color: ${COLORS.BLACK};
  margin: 5px 0 5px;
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
      props.$isActive.male ? COLORS.THEME_COLOR2 : COLORS.WHITE};
    color: ${(props) => (props.$isActive.male ? COLORS.WHITE : COLORS.BLACK)};
    border: ${(props) =>
      props.$isActive.male ? 'none' : '1px solid ${COLORS.BLACK}'};
  }
  .femaleBtn {
    background-color: ${(props) =>
      props.$isActive.female ? COLORS.THEME_COLOR2 : COLORS.WHITE};
    color: ${(props) => (props.$isActive.female ? COLORS.WHITE : COLORS.BLACK)};
    border: ${(props) =>
      props.$isActive.female ? 'none' : '1px solid ${COLORS.BLACK}'};
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
  margin: 5px 0 5px;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  background-color: ${COLORS.THEME_COLOR2};
  color: ${COLORS.WHITE};
  letter-spacing: 0.1rem; /* 글자간격 */
  &:hover {
    opacity: 0.9;
  }
`

const Space = styled.div`
  height: 16px;
  margin-top: 5px;
`
const ErrorText = styled.span`
  color: red;
  height: 16px;
  font-size: 0.8rem;
  margin-top: 5px;
`
export default SignUpPage
