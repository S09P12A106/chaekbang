import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import GroupInfoInput from './GroupInfoInput'
import GroupTagInput from './GroupTagInput'
import Swal from 'sweetalert2'
import GroupImageInput from './GroupImageInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import patchGroup from '../../api/modifyGroupApi'
import { jwtBackApiInstance } from '../../api/http'

const groupId = 1

const Container = styled.div`
  max-width: 960px;
  margin-left: 50px;
  margin-right: 50px;
`

const HrTag = styled.hr`
  background: #e3e3e3;
  height: 1px;
  border: 0;
`

const TextContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`

const GrayText = styled.div`
  font-size: 15px;
  color: #7b7b7b;
`

const RedText = styled.div`
  margin-right: 20px;
  font-size: 15px;
  color: #ff0000;
`

const GreenText = styled.div`
  margin-right: 20px;
  font-size: 15px;
  color: #088a08;
`

const Message = styled.div`
  color: #ff2020;
  font-size: 18px;
  padding-left: 10px;
  padding-top: 3px;
`

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
`

const CreateButton = styled.div`
  background-color: #00bbc6;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  color: white;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
  cursor: pointer;
`

const NotCreateButton = styled.div`
  background-color: #93c5c8;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  color: #f1f1f1;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  cursur: pointer;
`

function UpdateGroup() {
  const currentUrlSplited = window.location.href.split('/')
  const groupId = currentUrlSplited[currentUrlSplited.length - 2]

  const navigate = useNavigate()

  const [origins, setOrigins] = useState({
    title: null,
    detail: null,
    tagNames: null,
  })
  const [inputs, setInputs] = useState({
    title: null,
    detail: null,
    tagNames: null,
    imageUrl: null,
  })

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setInputs({
          ['title']: null,
          ['detail']: null,
          ['tagNames']: null,
          ['imageUrl']: null,
        })
        setInputs({
          ['title']: null,
          ['detail']: null,
          ['tagNames']: null,
        })
        const jwtHttp = jwtBackApiInstance()
        const URL = `api/groups/${groupId}/info`
        const response = await jwtHttp.get(URL)

        setInputs({
          title: response.data.data.title,
          detail: response.data.data.detail,
          tagNames: response.data.data.tags.map((tag) => tag.tagName),
          imageUrl: response.data.data.imageUrl,
        })
        setOrigins({
          title: response.data.data.title,
          detail: response.data.data.detail,
          tagNames: response.data.data.tags.map((tag) => tag.tagName),
        })
      } catch (error) {
        navigate('/error')
      }
    }
    fetchGroup()
  }, [])

  const [errorMessages, setMessages] = useState({
    titleMessage: '',
    detailMessage: '',
  })

  const [isValid, setValid] = useState(true)
  const [image, setImage] = useState(null)
  const [imageMessage, setImageMessage] = useState()
  const [isImageChanged, setIsImageChanged] = useState(false)

  const { title, detail, tagNames, imageUrl } = inputs
  const { titleMessage, detailMessage } = errorMessages
  const [requestErrorMessage, setRequestErrorMessage] = useState('')
  const [isSomethingChanged, setIsSomethingChanged] = useState(false)

  const isTagNamesSame = () => {
    if (
      origins['tagNames'].every((item) => tagNames.includes(item)) &&
      tagNames.every((item) => origins['tagNames'].includes(item))
    ) {
      return true
    }
    return false
  }

  const onChangeTitle = (e) => {
    const { value, name } = e.target
    if (value.length == 0) {
      setMessages({
        ...errorMessages,
        ['titleMessage']: '※ 모임 이름을 입력해주세요.',
      })
      setValid(false)
    } else if (value.length > 30) {
      setMessages({
        ...errorMessages,
        ['titleMessage']: '※ 모임 이름을 30자 이내로 입력해주세요.',
      })
      setValid(false)
    } else {
      setMessages({
        ...errorMessages,
        ['titleMessage']: '',
      })
      if (detailMessage === '') {
        setValid(true)
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    })

    if (
      origins['title'] != value ||
      origins['detail'] != detail ||
      !isTagNamesSame()
    ) {
      setIsSomethingChanged(true)
    } else {
      setIsSomethingChanged(false)
    }
  }

  const onChangeDetail = (e) => {
    const { value, name } = e.target
    if (value.length == 0) {
      setMessages({
        ...errorMessages,
        ['detailMessage']: '※ 모임 소개를 입력해주세요.',
      })
      setValid(false)
    } else {
      setMessages({
        ...errorMessages,
        ['detailMessage']: '',
      })
      if (titleMessage === '') {
        setValid(true)
      }
    }
    setInputs({
      ...inputs,
      [name]: value,
    })

    if (
      origins['title'] != title ||
      origins['detail'] != value ||
      !isTagNamesSame()
    ) {
      setIsSomethingChanged(true)
    } else {
      setIsSomethingChanged(false)
    }
  }

  const updateGroup = () => {
    Swal.fire({
      title: '수정을 완료하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '수정',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const groupData = new FormData()
        groupData.append('title', inputs.title)
        groupData.append('detail', inputs.detail)
        groupData.append('tagNames', [inputs.tagNames])
        groupData.append('imageChanged', isImageChanged)
        if (image !== null) {
          groupData.append('image', image)
        }

        try {
          await patchGroup(groupData, groupId)
          navigate('/mygroup')
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setRequestErrorMessage(error.response.data.message)
          } else {
            // 페이지 이동 삽입
            navigate('/error')
          }
        }
      }
    })
  }

  const formOptions = {
    title: {
      info: '모임 이름',
      placeholder: '모임 이름을 30자 이내로 입력해주세요.',
      height: 40,
    },
    detail: {
      info: '모임 소개',
      placeholder: '모임에 대한 소개를 입력해주세요.',
      height: 320,
    },
  }

  if (!Object.values(inputs).every((elem) => elem !== null)) {
    return null
  }
  return (
    <Container>
      <GroupInfoInput
        formOption={formOptions.title}
        errorMessage={titleMessage}
        onChange={onChangeTitle}
        name={'title'}
        value={title}
      ></GroupInfoInput>
      <HrTag></HrTag>
      <GroupInfoInput
        formOption={formOptions.detail}
        errorMessage={detailMessage}
        onChange={onChangeDetail}
        name={'detail'}
        value={detail}
      ></GroupInfoInput>
      <HrTag></HrTag>
      <GroupImageInput
        info={'모임 배경 사진'}
        imageMessage={imageMessage}
        setImageMessage={setImageMessage}
        setImage={setImage}
        originImageSource={inputs.imageUrl}
        setIsImageChanged={setIsImageChanged}
      ></GroupImageInput>
      <HrTag></HrTag>
      <GroupTagInput
        setInputs={setInputs}
        inputs={inputs}
        tagNames={tagNames}
        setIsSomethingChanged={setIsSomethingChanged}
        origins={origins}
      ></GroupTagInput>
      <MessageContainer>
        <Message>
          {requestErrorMessage ? '※ ' + requestErrorMessage : ''}
        </Message>
      </MessageContainer>

      <ButtonContainer>
        {isValid && (isSomethingChanged || isImageChanged) ? (
          <CreateButton onClick={updateGroup}>모임 수정하기</CreateButton>
        ) : (
          <NotCreateButton>모임 수정하기</NotCreateButton>
        )}
      </ButtonContainer>
    </Container>
  )
}

export default UpdateGroup
