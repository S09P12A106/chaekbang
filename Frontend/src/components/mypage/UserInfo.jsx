import React, { useState } from 'react'
import { styled } from 'styled-components'

const Container = styled.div``

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ImageContainer = styled.div`
  height: 200px;
  width: 200px;
  overflow: hidden;
  border-radius: 70%;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`
const Image = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const GrayText = styled.div`
  font-size: 16px;
  color: #909090;
  margin-top: 10px;
  margin-bottom: 8px;
`

const BlackText = styled.div`
  font-size: 20px;
  color: black;
  margin-top: 10px;
  margin-bottom: 15px;
`

const GrayLine = styled.div`
  background-color: #d9d9d9;
  height: 1px;
`

const TextFlex = styled.div`
  display: flex;
  justify-content: space-between;
`

const UpdateButton = styled.div`
  font-size: 16px;
  color: #909090;
  margin-top: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`

function UserInfoFixed({ name, value }) {
  return (
    <Container>
      <GrayText>{name}</GrayText>
      <BlackText>{value}</BlackText>
      <GrayLine></GrayLine>
    </Container>
  )
}

function UserInfoModifiable({ name, value, updateNickname }) {
  return (
    <Container>
      <GrayText>{name}</GrayText>
      <TextFlex>
        <BlackText>{value}</BlackText>
        <UpdateButton onClick={updateNickname}>수정</UpdateButton>
      </TextFlex>
      <GrayLine></GrayLine>
    </Container>
  )
}

function UserInfo({ user }) {
  return (
    <Container>
      <CenteredContainer>
        <ImageContainer>
          <Image src={user.profileImageUrl}></Image>
        </ImageContainer>
      </CenteredContainer>
      <UserInfoFixed name={'닉네임'} value={user.nickname}></UserInfoFixed>
      <UserInfoFixed name={'이메일'} value={user.email}></UserInfoFixed>
      <UserInfoFixed
        name={'성별'}
        value={user.gender === 'M' ? '남성' : '여성'}
      ></UserInfoFixed>
      <UserInfoFixed name={'생년월일'} value={user.birthDate}></UserInfoFixed>
    </Container>
  )
}

export default UserInfo
