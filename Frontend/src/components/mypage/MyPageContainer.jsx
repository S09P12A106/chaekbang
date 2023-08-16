import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import UserInfo from './UserInfo'
import GroupList from './GroupList'
import { getUser } from './UserDummy'
import { jwtBackApiInstance } from '../../api/http'
import { useSelector } from 'react-redux'
import Modal from '../common/ModalWindow'
import UpdateModal from './UpdateModal'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 60px;
`

const InnerContainer = styled.div`
  width: 600px;
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const InfoInnerContainer = styled.div`
  padding-top: 40px;
  width: 500px;
`

const Title = styled.div`
  font-size: 30px;
  font-weight: 500;
`

const ButtonContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`

const UpdateButton = styled.div`
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

function MyPageContainer() {
  const dummy = getUser()
  const userId = useSelector((state) => {
    return state.rootReducer.loginReducer.user.userId
  })
  const [modalOpened, setModalOpened] = useState(false)
  const [originUserData, setOriginUserData] = useState({
    userId: null,
    nickname: null,
    email: null,
    profileImageUrl: null,
    gender: null,
    birthDate: null,
  })

  const [myGroup, setMyGroup] = useState(null)
  const [myHistory, setMyHistory] = useState(null)

  const [nickname, setNickname] = useState(null)
  const navigate = useNavigate()

  const updateUser = () => {
    setModalOpened(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOriginUserData({
          userId: null,
          nickname: null,
          email: null,
          profileImageUrl: null,
          gender: null,
          birthDate: null,
        })

        const jwtHttp = jwtBackApiInstance()
        const URL = `api/users/${userId}`
        const response = await jwtHttp.get(URL)
        const myGroupData = await jwtHttp.get('api/groups/my-groups')
        const myHistoryData = await jwtHttp.get('api/groups/my-history')

        setOriginUserData({
          nickname: response.data.data.nickname,
          email: response.data.data.email,
          profileImageUrl: response.data.data.profileImageUrl,
          gender: response.data.data.gender,
          birthDate: response.data.data.birthDate,
        })
        setMyGroup(myGroupData.data.data)
        setMyHistory(myHistoryData.data.data)
      } catch (error) {
        navigate('/error')
      }
    }
    fetchData()
  }, [])

  if (!Object.values(originUserData).every((elem) => elem !== null)) {
    return null
  }

  return (
    <Container>
      <Modal isOpen={modalOpened} width={'350px'}>
        <UpdateModal
          imageUrl={originUserData.profileImageUrl}
          setModalOpened={setModalOpened}
          nickname={originUserData.nickname}
          userId={userId}
        ></UpdateModal>
      </Modal>
      <InnerContainer>
        <Title>마이페이지</Title>
        <InfoContainer>
          <InfoInnerContainer>
            <UserInfo user={originUserData}></UserInfo>
            <br></br>
            <ButtonContainer>
              <UpdateButton onClick={updateUser}>내 정보 수정하기</UpdateButton>
            </ButtonContainer>
            <GroupList title={'내 모임'} groups={myGroup}></GroupList>
            <GroupList title={'이전 모임 기록'} groups={myHistory}></GroupList>
          </InfoInnerContainer>
        </InfoContainer>
      </InnerContainer>
    </Container>
  )
}

export default MyPageContainer
