import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const InnerContainer = styled.div`
  width: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
`

const Title = styled.div`
  font-size: 25px;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 30px;
  border: 1px solid #bdbdbd;
  margin-bottom: 10px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const CancelButton = styled.div`
  width: 70px;
  height: 30px;
  border: 1px solid #bdbdbd;
  color: #bdbdbd;
  text-align: center;
  line-height: 30px;
  border-radius: 8px;
  margin-right: 4px;
  cursor: pointer;
`

const SaveButton = styled.div`
  width: 70px;
  height: 30px;
  color: white;
  text-align: center;
  line-height: 30px;
  border-radius: 8px;
  background-color: #1f8e94;
  margin-left: 4px;
  cursor: pointer;
`

const CanNotSaveButton = styled.div`
  width: 70px;
  height: 30px;
  border: 1px solid #bdbdbd;
  color: #bdbdbd;
  text-align: center;
  line-height: 30px;
  border-radius: 8px;
  margin-left: 4px;
`

const ErrorMessage = styled.div`
  color: #ff2020;
  font-size: 12px;
`

function NicknameModal({ setModalOpened, setNickname, nickname }) {
  const [errorMessage, setErroeMessage] = useState('')

  const [input, setInput] = useState(nickname)

  const onChange = (e) => {
    if (!e.target.value) {
      setErroeMessage('※ 닉네임을 입력해주세요.')
    } else if (e.target.value.length > 20) {
      setErroeMessage('※ 닉네임을 20자 이내로 입력해주세요.')
    } else {
      setErroeMessage('')
    }
    setInput(e.target.value)
  }

  const cancelModal = () => {
    setModalOpened(false)
  }

  const updateNickname = () => {
    console.log(input, '변경 요청 보내기')
    setNickname(input)
    setModalOpened(false)
  }

  const modalRef = useRef()
  useEffect(() => {
    // 모달창 바깥을 눌렀을 때 modal 해제
    const handler = () => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpened(false)
      }
    }
    document.addEventListener('mousedown', handler)
  })

  return (
    <Container ref={modalRef}>
      <InnerContainer>
        <Title>닉네임 수정</Title>
        <Input onChange={onChange} value={input}></Input>
        {errorMessage !== '' ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : null}
        <ButtonGroup>
          <CancelButton onClick={cancelModal}>취소</CancelButton>
          {errorMessage === '' ? (
            <SaveButton onClick={updateNickname}>수정</SaveButton>
          ) : (
            <CanNotSaveButton>수정</CanNotSaveButton>
          )}
        </ButtonGroup>
      </InnerContainer>
    </Container>
  )
}

export default NicknameModal
