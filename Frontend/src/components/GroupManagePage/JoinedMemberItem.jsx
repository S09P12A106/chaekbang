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

const Image = styled.img`
  object-fit: cover;
  height: 100%;
  widht: 100%;
`

const ButtonContainer = styled.div`
  position: relative;
  top: 90px;
`

const OutButton = styled.div`
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  background-color: #00bbc6;
  color: white;
  border-radius: 10px;
  width: 81px;
  height: 30px;
  line-height: 30px;
`

const DevideLine = styled.hr`
  background: #00bbc6;
  height: 1px;
  border: 0;
  opacity: 0.5;
`

function JoinedMemberItem({ user, underLine, onRemove }) {
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
          </TextContainer>
        </MemberInfo>
        <ButtonContainer>
          <OutButton onClick={() => onRemove(user.id)}>내보내기</OutButton>
        </ButtonContainer>
      </ContentContainer>
      {underLine ? <DevideLine></DevideLine> : null}
    </Container>
  )
}

export default JoinedMemberItem
