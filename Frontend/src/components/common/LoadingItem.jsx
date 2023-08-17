import React from 'react'
import styled from 'styled-components'
import BookLoading from '../../assets/BookLoading.gif'

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  img {
    display: inline-block;
    width: 5rem;
  }
`

const LoadingImageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`
const LoadingText = styled.div`
  text-align: center;
  margin-top: 15rem;
  font-size: 1rem;
`

function LoadingItem() {
  return (
    <LoadingContainer>
      <LoadingText>로딩중입니다..</LoadingText>
      <LoadingImageBlock>
        <img src={BookLoading} />
      </LoadingImageBlock>
    </LoadingContainer>
  )
}

export default LoadingItem
