import React, { useEffect, useState, useContext } from 'react'
import { BoardContext } from '../context/BoardContext'

import { styled } from 'styled-components'
import UserVideoComponent from '../../WaitingRoom/UserVideoComponent'
import CONSOLE from '../../../utils/consoleColors'

function GridScreen({ grid }) {
  CONSOLE.reRender('GridScreen Rerendered!')
  const [columns, rows, rate, n, m] = grid
  const [fullHorizontal, setFullHorizontal] = useState(false)
  const { meetingInfoState, videoOption, toggleMic, toggleCam } =
    useContext(BoardContext)
  const [meetingInfo, setMeetingInfo] = meetingInfoState

  // rate가 row와 column으로 달라지면 fullHorizontal 을 재설정
  useEffect(() => {
    const line = (9 * rows) / (5 * columns)
    setFullHorizontal(rate < line)
  }, [rate])

  useEffect(() => {}, [rows, columns])

  return (
    <GridContainer
      rows={rows}
      columns={columns}
      mode={fullHorizontal}
      n={n}
      m={m}
    >
      {[meetingInfo.publisher, ...meetingInfo.subscribers].map((sub, i) => (
        <GridCell
          rows={rows}
          key={sub.id}
          onClick={() => this.handleMainVideoStream(sub)}
        >
          <span>{sub.id}</span>
          <UserVideoComponent streamManager={sub} />
        </GridCell>
      ))}
    </GridContainer>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.columns}, 1fr);
  grid-template-columns: repeat(${(props) => props.rows}, 1fr);
  /* grid-template-columns: 1fr 1fr 1fr; */
  gap: 10px;
  // background-color: #f0f0f0;
  padding: 10px;

  width: ${(props) => (props.mode ? '100%' : undefined)};
  height: ${(props) => (props.mode ? undefined : '100%')};
  // 비율 나중에 수정
  aspect-ratio: ${(props) =>
    props.rows > props.columns
      ? (9 * props.m) / (5 * props.n)
      : (9 * props.n) / (5 * props.m)};
`

const GridCell = styled.div`
  display: flex;
  width: 100%;
`

export default GridScreen
