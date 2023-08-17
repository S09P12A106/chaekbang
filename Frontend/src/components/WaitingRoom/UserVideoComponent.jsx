import React, { useState } from 'react'
import styled from 'styled-components'
import OpenViduVideoComponent from './OvVideo'
import './UserVideo.css'
import CONSOLE from '../../utils/consoleColors'

/*
- streamManager : openvidu에서 제공해주는 Publisher type
- 접속자 한명의 영상 정보(Publisher)가 들어옵니다.
*/
const UserVideoComponent = ({ nickname, streamManager }) => {
  /**
   * 접속자의 streamManager로부터 닉네임 정보를 문자열로 반환합니다.
   * @returns {string}
   */
  function getNicknameTag() {
    return JSON.parse(streamManager.stream.connection.data).clientData
  }

  return (
    <div>
      {streamManager !== undefined ? (
        <MainVideoContanier>
          <OpenViduVideoComponent streamManager={streamManager} />
          <NickNameBox>
            {streamManager.stream.connection ? getNicknameTag() : nickname}
          </NickNameBox>
        </MainVideoContanier>
      ) : null}
    </div>
  )
}

const MainVideoContanier = styled.div`
  position: relative;
  margin: 0 auto;
`

const NickNameBox = styled.div`
  position: absolute;
  background: #f8f8f8;
  padding-left: 5px;
  padding-right: 5px;
  color: #777777;
  font-weight: bold;
  border-bottom-right-radius: 4px;
  top: 0;
  left: 0;
`

export default UserVideoComponent
