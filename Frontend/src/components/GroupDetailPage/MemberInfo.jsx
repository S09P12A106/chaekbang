import React from 'react'
import styled from 'styled-components'

const MemberInfo = ({ member }) => {
  return (
    <MemberInfoContainer>
      <ProfileImg>
        <img src={member.profileImageUrl} alt="member image" />
      </ProfileImg>
      <MemberInfoBox>
        <h3>{member.nickname}</h3>
        <p>{member.participatedCount}개의 모임을 참여했어요!</p>
      </MemberInfoBox>
    </MemberInfoContainer>
  )
}

const MemberInfoContainer = styled.div`
  /* display: inline-block; */
  padding: 1rem;
`

const ProfileImg = styled.div`
  display: inline-block;
  text-align: center;
  margin-right: 1rem;
`

const MemberInfoBox = styled.div`
  display: inline-block;

  h3 {
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
  }
`

export default MemberInfo
