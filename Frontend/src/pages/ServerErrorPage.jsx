import React from 'react'
import MainLayout from '../components/Layout/MainLayout'
import { styled } from 'styled-components'
import 로고 from '../../src/assets/로고.png'
import 이름 from '../../src/assets/이름.png'
import { useNavigate } from 'react-router-dom'

const Container = styled.div``
const MessageContainer = styled.div`
  text-align: center;
  margin-bottom: 5rem;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 2rem;
`
const Image = styled.img`
  width: 8rem;
`

const Button = styled.button`
  height: 1.8rem;
  width: 7rem;
  margin-top: 1rem;
  border: 1px solid #959595;
  background-color: white;
  color: #959595;
  border-radius: 0.7rem;
`

const TitleContainer = styled.div`
  font-size: 1.3rem;
  margin-bottom: 0.4rem;
`
const TextContainer = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  color: #959595;
`

const LinkTag = styled.a`
  color: #1f8e94;
  font-size: 0.9rem;
  text-decoration: underline;
`

function ServerErrorPage() {
  const navigate = useNavigate()
  const toMain = () => {
    navigate('/')
  }
  return (
    <MainLayout>
      <Container>
        <MessageContainer>
          <ImageContainer>
            <Image src={로고}></Image>
            <Image src={이름}></Image>
          </ImageContainer>
          <TitleContainer>
            기술적인 문제로 서비스에 접속이 되지 않았습니다.
          </TitleContainer>
          <TextContainer>
            일시적인 현상으로, 잠시 후 다시 이용해보시면 정상 접속될 수
            있습니다.
          </TextContainer>
          <TextContainer>
            담당 부서에서 확인중이나, 문제가 계속되는 경우 접속 오류에 대해{' '}
            <LinkTag href="https://www.multicampus.com/kr/index.html">
              고객센터
            </LinkTag>
            로 연락 부탁 드립니다.
          </TextContainer>
          <TextContainer>
            이용에 불편을 드려 다시 한 번 사과 드립니다.
          </TextContainer>
          <Button onClick={toMain}>서비스 홈 가기</Button>
        </MessageContainer>
      </Container>
    </MainLayout>
  )
}

export default ServerErrorPage
