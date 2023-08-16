import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { kakaoUnlink } from '../utils/kakaoUnlink'
import styled from 'styled-components'
import COLORS from '../constants/colors'
import kakaoImage from '../assets/kakao_login.png'
import googleImage from '../assets/googleBtn.png'
import KakaoLogin from 'react-kakao-login'
import LogoImg from '../components/LoginPage/LogoImg'
import { loginAction } from '../store/LoginUser'
import { useDispatch } from 'react-redux'
import { loginApi } from '../api/authApi'
import { getUserInfoApi } from '../api/userApi'
import { saveToken } from '../utils/tokenUtil'

const LoginPage = () => {
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const kakaoClientId = process.env.REACT_APP_KAKAOMAP_KEY

  // 로그인 성공 시
  const kakaoOnSuccess = async (data) => {
    // 로그인 시 발생하는 idTkn
    const idToken = data.response.id_token
    const requestBody = {
      idToken,
      oauthProvider: 'KAKAO',
      isLoginKeep: keepLoggedIn,
    }
    // API 요청 보내기
    try {
      const response = await loginApi(requestBody)
      const { newUser, accessToken, refreshToken } = response.data
      // 신규 유저이면 회원가입 페이지로 이동
      if (newUser) {
        navigate('/signup', {
          state: {
            oauthProvider: 'KAKAO',
            idToken: idToken,
          },
        })
        return
      }
      // 신규 회원이 아닐 경우 메인페이지로 이동
      // 로컬 스토리지에 토큰 저장
      saveToken(accessToken, refreshToken)
      const userInfo = await getUserInfoApi()
      dispatch(loginAction(userInfo.data))
      navigate('/')
    } catch (error) {
      console.error('API 요청 에러:', error)
      alert('현재 로그인 할 수 없습니다')
    }
  }

  // 로그인 실패 시
  const kakaoOnFailure = (error) => {
    console.log(error)
  }

  // 카카오 oauth 끊기
  function handleKakaoUnlink() {
    kakaoUnlink() // authUtils에서 가져온 kakaoUnlink 함수 사용
      .then(function (response) {
        console.log('카카오 연결 해제:', response)
      })
      .catch(function (error) {
        console.log('카카오 연결 해제 에러:', error)
      })
  }

  // 로그인 유지 버튼
  function handleKeepLoggedInChange() {
    setKeepLoggedIn((prevKeepLoggedIn) => !prevKeepLoggedIn)
  }

  return (
    <Container className="container">
      <PageContainer>
        <LogoImg marginButtonRem={5} />
        <Pharse>
          <H1>안녕하세요,</H1>
          <H3>로그인하여 당신의 이야기를 들려주세요</H3>
        </Pharse>
        <KakaoLogin
          token={kakaoClientId}
          onSuccess={kakaoOnSuccess}
          onFail={kakaoOnFailure}
          render={(props) => (
            <StyledButton onClick={props.onClick}>
              <img src={kakaoImage} alt="kakaologinbar" />
            </StyledButton>
          )}
        />
        {/* (임시) 구글버튼 > 회원탈퇴 */}
        {/* <StyledButton onClick={handleKakaoUnlink}>
          <img src={googleImage} alt="googleloginbar" />
        </StyledButton> */}
        <KeepLogin>
          <input
            type="checkbox"
            checked={keepLoggedIn}
            onChange={handleKeepLoggedInChange}
          />
          <h5>로그인상태 유지</h5>
        </KeepLogin>
      </PageContainer>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 175px 0px;
`

const Pharse = styled.div`
  margin-bottom: 2rem;
`

const H1 = styled.h1`
  font-size: 1.25rem;
  color: ${COLORS.BLACK};
`

const H3 = styled.h3`
  font-size: 0.9rem;
  color: ${COLORS.GREY};
`

const StyledButton = styled.button`
  background-color: transparent;
  img {
    width: 100%;
    height: 2.5rem;
    margin-bottom: 1.75rem;
  }
`
// const GoogleLogin = styled.button``

const KeepLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h5 {
    margin-left: 9px;
    font-size: 15px;
    color: ${COLORS.GREY};
  }
`

export default LoginPage
