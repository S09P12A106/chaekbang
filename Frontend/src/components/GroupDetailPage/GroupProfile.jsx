import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LeaderInfo from './LeaderInfo'
import COLORS from '../../constants/colors'
import { findLeader } from './util'
import { isAppliedUser, cancelApplication } from '../../api/groupDetailApi'
import { waringConfirmOption } from '../../utils/confirmSwalModal'
import Swal from 'sweetalert2'
import CONSOLE from '../../utils/consoleColors'

const GroupProfile = ({ group, membersInfo, setModalOpen }) => {
  const navigate = useNavigate()

  // TODO: 그룹에 신청한 상태인지 가져오는 api 연동
  const [hasApplied, setHasApplied] = useState(null)

  const { groupId } = useParams()

  const loggedInUser = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  useEffect(() => {
    // api : 가입 여부 가져오기
    if (loggedInUser) {
      isAppliedUser(groupId)
        .then(({ data }) => {
          setHasApplied(data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  /*
   * 로그인이 되어있지 않으면 false
   * 로그인이 되어 있으면 현재 로그인 유저가 해당 모임 가입유저인지
   */
  const isMemberOfGroup = loggedInUser
    ? membersInfo.users.some((user) => user.id === loggedInUser.userId)
    : false

  const leader = findLeader(membersInfo.users, membersInfo.leaderId)

  const handleCancelBtnClick = async () => {
    Swal.fire(waringConfirmOption('정말 모임 신청을 취소하시겠습니까?')).then(
      async (result) => {
        if (result.isConfirmed) {
          try {
            await cancelApplication(groupId)
            alert('모임 신청이 취소되었습니다.')
            navigate('/')
          } catch (error) {
            console.log(error)
            alert('모임 신청 취소에 실패했습니다. 잠시뒤에 다시 시도해주세요')
          }
        }
      },
    )
  }

  return (
    <ProfileGridBox>
      <ImageContainer>
        {/* 이미지 컨테이너 */}
        <ProfileImg>
          <img src={`${group.imageUrl}`} alt="그룹 프로필 이미지" />
        </ProfileImg>
      </ImageContainer>

      <InfoContainer>
        <InfoInnerContainer>
          <h1>{group.title}</h1>
          {/* <div>yes or no : {temp}</div> --> api 통신 확인*/}
          <p>
            현재{' '}
            <MemberCountHighlight>
              {membersInfo.users.length}
            </MemberCountHighlight>
            명이 함께하고 있어요
          </p>

          <TagList>
            {group.tags.map((tag, index) => {
              return <Tag key={index}>#{tag.tagName}</Tag>
            })}
          </TagList>

          <LeaderInfo leader={leader} />

          {loggedInUser &&
            !isMemberOfGroup &&
            hasApplied !== null &&
            (hasApplied ? (
              <GroupApplyButtons>
                <GroupButton
                  color={COLORS.RED}
                  text="white"
                  onClick={handleCancelBtnClick}
                >
                  신청 취소
                </GroupButton>
              </GroupApplyButtons>
            ) : (
              <GroupApplyButtons>
                <GroupButton
                  color={COLORS.THEME_COLOR4}
                  text="white"
                  onClick={() => setModalOpen(true)}
                >
                  신청하기
                </GroupButton>
              </GroupApplyButtons>
            ))}
        </InfoInnerContainer>
      </InfoContainer>
    </ProfileGridBox>
  )
}

const ImageContainer = styled.div`
  flex-basis: 50%;
  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`

const InfoContainer = styled.div`
  flex-basis: 50%;
  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`

const InfoInnerContainer = styled.div`
  padding-left: 20px;
`

const ProfileGridBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`

const ProfileImg = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`

const MemberCountHighlight = styled.span`
  color: #00bbc6;
`

const TagList = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const Tag = styled.div`
  background-color: ${COLORS.THEME_COLOR2};
  color: white;
  padding: 0.5rem;
  border-radius: 0.8rem;
  margin-right: 8px;
  margin-bottom: 8px;
`

const GroupApplyButtons = styled.div`
  text-align: right;
  margin-top: 4rem;
  margin-right: 2rem;
  // margin: 5rem 4rem 2rem;
`

const GroupButton = styled.span`
  display: inline-block;
  padding: 0.5rem 1.3rem;
  background-color: ${(props) => props.color};
  color: ${(props) => props.text};
  text-align: center;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`

export default React.memo(GroupProfile)
