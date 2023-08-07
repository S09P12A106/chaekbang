import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import IMAGE_RELOAD from '../../assets/IMAGE_RELOAD.png'
import TEMP_IMAGE from '../../assets/TEMP_IMAGE.png'

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  padding-top: 40px;
`

const InfoContainer = styled.div`
  margin-left: 40px;
  line-height: 40px;
  font-size: 15px;
  min-width: 120px;
`

const InputContainer = styled.div`
  margin-right: 40px;
  width: 500px;
  border-width: 1px;
  border-radius: 5px;
  padding-left: 10px;
  line-height: 37px;
  resize: none;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`
const ImageInput = styled.input`
  width: 333px;
  height: 321px;
  display: none;
`

const Image = styled.img`
  width: 400px;
  height: 385px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  position: relative;
`

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #7b7b7b;
  font-size: 10px;
`

const MessageContainer = styled.div`
  color: #ff2020;
  font-size: 12px;
  padding-left: 50px;
  padding-top: 3px;
`

function validFileName(fileName) {
  const extensionList = ['jpg', 'png', 'jpeg']
  for (let extension in extensionList) {
    if (fileName.toLowerCase().endsWith(extension)) {
      return true
    }
  }
  return false
}

function GroupImageInput({
  imageMessage,
  setImageMessage,
  info,
  setImage,
  originImageSource,
  setIsImageChanged,
}) {
  const [imageUrl, setImageUrl] = useState(originImageSource)

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
      setIsImageChanged(true)
      setImage(file)
      setImageMessage('')
    }
  }

  const imageInput = useRef()

  const onClick = (e) => {
    imageInput.current.click()
  }

  const resetImage = (e) => {
    setImageUrl(TEMP_IMAGE)
    setImage('')
    setImageMessage('')
    setIsImageChanged(true)
  }

  return (
    <FormContainer>
      <InfoContainer>{info}</InfoContainer>
      <div>
        <InputContainer>
          <ImageContainer>
            <div style={{ position: 'relative' }}>
              <ImageInput
                type="file"
                accept="image/png, image/jpg, image/jpeg"
                ref={imageInput}
                onChange={handleImageChange}
              ></ImageInput>
              <Image onClick={onClick} src={imageUrl}></Image>
              <div
                style={{ position: 'absolute', top: '357px', left: '375px' }}
              >
                <img
                  src={IMAGE_RELOAD}
                  style={{ height: '50px', width: '50px', cursor: 'pointer' }}
                  onClick={resetImage}
                ></img>
              </div>
            </div>
          </ImageContainer>
          <MessageContainer>{imageMessage}</MessageContainer>
          <br></br>
          <TextContainer>
            모임을 드러낼 수 있는 배경 사진을 등록해주세요. 등록하지 않으면 기본
            이미지로 설정됩니다.
          </TextContainer>
        </InputContainer>
      </div>
    </FormContainer>
  )
}

export default GroupImageInput
