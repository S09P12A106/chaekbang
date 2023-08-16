import React from 'react'
import styled from 'styled-components'

const LeaderTitleContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`

const LeaderTitle = styled.div`
  font-size: 25px;
`

const LeaderInfo = ({ leader }) => {
  return (
    <LeaderInfoContainer>
      <LeaderTitleContainer>
        <LeaderTitle>
          모임장{' '}
          <LeaderNicknameHighlight>{leader.nickname}</LeaderNicknameHighlight>을
          소개합니다.
        </LeaderTitle>
      </LeaderTitleContainer>
      <LeaderProfileImg>
        <div className="image-container">
          <img src={`${leader.profileImageUrl}`} alt="리더 프로필 이미지" />
        </div>
      </LeaderProfileImg>
      <AboutmeHighlight>
        {leader.aboutMe.split('\n').map((line, key) => {
          return (
            key,
            (
              <span>
                {line}
                <br />
              </span>
            )
          )
        })}
      </AboutmeHighlight>
    </LeaderInfoContainer>
  )
}

const LeaderInfoContainer = styled.div`
  text-align: center;
`

const LeaderProfileImg = styled.div`
  img {
    width: 150px;
    height: 150px;
    border-radius: 1rem;
    overflow: hidden;
    border: 0.01rem solid white;
    box-shadow: 0 0.2rem 0.3rem 0.1rem gray;
  }

  .image-container {
    margin: 0 auto;
    text-align: center;
    justify-content: center;
  }
`

const LeaderNicknameHighlight = styled.span`
  font-weight: 700;
`

const AboutmeHighlight = styled.div`
  color: #707070;
  margin: 1rem 0;
  padding-left: 2rem;
  padding-right: 3rem;
  margin-top: 25px;
`

export default LeaderInfo
