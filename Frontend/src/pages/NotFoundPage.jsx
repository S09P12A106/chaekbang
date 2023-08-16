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

function NotFoundPage() {
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
          <TitleContainer>요청하신 페이지를 찾을 수 없습니다.</TitleContainer>
          <TextContainer>
            방문하시려는 페이지의 주소가 잘못 입력되었거나,
          </TextContainer>
          <TextContainer>
            페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수
            없습니다.
          </TextContainer>
          <TextContainer>
            입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
          </TextContainer>
          <TextContainer>감사합니다.</TextContainer>
          <Button onClick={toMain}>서비스 홈 가기</Button>
        </MessageContainer>
      </Container>
    </MainLayout>
  )
}

export default NotFoundPage
