import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import patchUser from '../../api/updateUserApi'
import { useNavigate } from 'react-router-dom'

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
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const InnerContainer = styled.div`
  width: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
`
const CenteredContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`
const Title = styled.div`
  font-size: 25px;
`

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-top: 5px;
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

const NicknameTitle = styled.div`
  margin-top: 20px;
`

const ImageInput = styled.input`
  width: 333px;
  height: 321px;
  display: none;
`

function UpdateModal({ setModalOpened, nickname, imageUrl, userId }) {
  const imageInput = useRef()
  const [image, setImage] = useState(null)
  const [errorMessage, setErroeMessage] = useState('')
  const [updatedImageUrl, setImageUrl] = useState(imageUrl)
  const [imageMessage, setImageMessage] = useState('')
  const [input, setInput] = useState(nickname)
  const [isImageChanged, setIsImageChanged] = useState(false)
  const [isNicknameChanged, setIsNicknameChanged] = useState(false)
  const navigate = useNavigate()

  const onChange = (e) => {
    if (!e.target.value) {
      setErroeMessage('※ 닉네임을 입력해주세요.')
    } else if (e.target.value.length > 20) {
      setErroeMessage('※ 닉네임을 20자 이내로 입력해주세요.')
    } else {
      setErroeMessage('')
    }
    if (e.target.value === nickname) {
      setIsNicknameChanged(false)
    } else {
      setIsNicknameChanged(true)
    }
    setInput(e.target.value)
  }

  const cancelModal = () => {
    setModalOpened(false)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file.type) {
      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg'
      ) {
        setImageMessage('※ 이미지 형식의 파일을 입력해주세요.')
        return
      }
    } else {
      if (!validFileName(file.name)) {
        setImageMessage('※ 이미지 형식의 파일을 입력해주세요.')
        return
      }
    }

    if (file.size > 20971520) {
      setImageMessage('※ 크키가 20MB 이하인 이미지를 등록해주세요.')
      return
    }

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result)
      }
      reader.readAsDataURL(file)
      setImage(file)
      setImageMessage('')
      setIsImageChanged(true)
    }
  }

  const updateNickname = async () => {
    const data = new FormData()
    data.append('nickname', input)
    data.append('imageChanged', isImageChanged)
    if (image !== null) {
      data.append('image', image)
    }
    try {
      const response = await patchUser(data)
      if (response.status === 200) {
        location.reload()
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErroeMessage(error.response.data.message)
      } else {
        // 페이지 이동 삽입
        navigate('/error')
      }
    }
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

  const onClick = (e) => {
    imageInput.current.click()
  }

  return (
    <Container ref={modalRef}>
      <InnerContainer>
        <Title>내 정보 수정</Title>
        <CenteredContainer>
          <ImageInput
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            ref={imageInput}
            onChange={handleImageChange}
          ></ImageInput>
          <ImageContainer>
            <Image onClick={onClick} src={updatedImageUrl}></Image>
          </ImageContainer>
        </CenteredContainer>
        {imageMessage !== '' ? (
          <ErrorMessage>{imageMessage}</ErrorMessage>
        ) : null}
        <NicknameTitle>닉네임</NicknameTitle>
        <Input onChange={onChange} value={input}></Input>
        {errorMessage !== '' ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : null}
        <ButtonGroup>
          <CancelButton onClick={cancelModal}>취소</CancelButton>
          {errorMessage === '' &&
          imageMessage === '' &&
          (isImageChanged === true || isNicknameChanged === true) ? (
            <SaveButton onClick={updateNickname}>수정</SaveButton>
          ) : (
            <CanNotSaveButton>수정</CanNotSaveButton>
          )}
        </ButtonGroup>
      </InnerContainer>
    </Container>
  )
}

export default UpdateModal
