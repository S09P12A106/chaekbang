import React, { useState } from 'react'
import styled from 'styled-components'
import OpenViduVideoComponent from './OvVideo'
import './UserVideo.css'
import CONSOLE from '../../utils/consoleColors'

const UserVideoComponent = ({ nickname, streamManager }) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <MainVideoContanier>
          <OpenViduVideoComponent streamManager={streamManager} />
          <NickNameBox>{nickname}</NickNameBox>
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
