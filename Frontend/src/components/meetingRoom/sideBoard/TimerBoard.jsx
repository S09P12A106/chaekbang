import React, { useContext, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import COLORS from '../../../constants/colors'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { useHandleTime } from './timer/useHandleTime'
import { BoardContext } from '../context/BoardContext'
import { convertSecond } from './timer/convertTime'

function TimerBoard() {
  const [isRunning, setIsRunning] = useState(false)
  const { whichBtn, setWhichBtn, meetingInfoState, client, currentTime } =
    useContext(BoardContext)
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  const mySessionId = meetingInfoState[0].mySessionId

  const {
    hour,
    setHour,
    minute,
    setMinute,
    second,
    setSecond,
    handleTime,
    isOn,
    setIsOn,
  } = useHandleTime()

  // 현재시간 받아오기 > MeetingRoomPage에서 받고 받아옴
  // [시, 분, 초]로 받아옴
  useEffect(() => {
    setHour(currentTime[0])
    setMinute(currentTime[1])
    setSecond(currentTime[2])
  }, [currentTime])

  useEffect(() => {
    // 메시지를 받았을 때 처리할 로직
    client.subscribe('/meeting/timer/currentTime', (message) => {
      const currentTime = JSON.parse(message.body)
      console.log('Received message:', currentTime)
    })
  }, [client])

  useEffect(() => {
    if (whichBtn === 3) {
      setIsToggleOpen(true)
    } else {
      setIsToggleOpen(false)
    }
  }, [whichBtn])

  // 타이머 시작 버튼을 눌렀을 때 > isRunning 중이라면 다시 안눌리도록
  const handleStart = () => {
    setIsRunning(true)
    const totalTime = convertSecond(hour, minute, second)
    // 백엔드로 시작 이벤트 전송
    if (client) {
      // publish 또는 send
      // Publish 함수는 (주소, {헤더}, 메세지)로 구성
      client.publish({
        destination: '/app/timer/startTimer',
        body: JSON.stringify({
          type: 'timer',
          time: totalTime,
        }),
      })
    }
  }

  // 타이머 일시정지 버튼을 눌렀을 때
  const handlePause = () => {
    setIsRunning(false)

    // 백엔드로 일시정지 이벤트 전송
    if (client) {
      client.publish({
        destination: '/app/timer/pauseTimer',
      })
    }
  }

  // 타이머 초기화 버튼을 눌렀을 때
  const handleReset = () => {
    setIsRunning(false)
    setHour(0)
    setMinute(0)
    setSecond(0)

    // 백엔드로 리셋 이벤트 전송
    if (client) {
      client.publish({
        destination: '/app/timer/resetTimer',
      })
    }
  }

  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn)
  }

  // 숫자를 두 자리 수로 바꾸기 위해
  const transformDouble = (time) => {
    return `${time.toString().padStart(2, '0')}`
  }

  return (
    <TimerContainer toggle={isToggleOpen}>
      <Clock>
        {!isRunning ? (
          <Btns>
            <UpperBtn onClick={() => handleTime(1)}>
              <IoIosArrowUp />
            </UpperBtn>
            <UpperBtn onClick={() => handleTime(2)}>
              <IoIosArrowUp />
            </UpperBtn>
            <UpperBtn onClick={() => handleTime(3)}>
              <IoIosArrowUp />
            </UpperBtn>
          </Btns>
        ) : (
          <IsNotRunning />
        )}
        <Times>
          <Hours>{transformDouble(hour)}</Hours>
          <p>:</p>
          <Minutes>{transformDouble(minute)}</Minutes>
          <p>:</p>
          <Seconds>{transformDouble(second)}</Seconds>
        </Times>
        {!isRunning ? (
          <Btns>
            <LowerBtn onClick={() => handleTime(4)}>
              <IoIosArrowDown />
            </LowerBtn>
            <LowerBtn onClick={() => handleTime(5)}>
              <IoIosArrowDown />
            </LowerBtn>
            <LowerBtn onClick={() => handleTime(6)}>
              <IoIosArrowDown />
            </LowerBtn>
          </Btns>
        ) : (
          <IsNotRunning />
        )}
      </Clock>
      <OptionBtn>
        <label>
          <span>{isOn ? '10' : '1'}</span>
          <input
            role="switch"
            type="checkbox"
            checked={isOn}
            onChange={handleToggle}
          />
        </label>
      </OptionBtn>
      <Buttons>
        <Pause onClick={handlePause}>Pause</Pause>
        <Start onClick={handleStart}>Start</Start>
        <Reset onClick={handleReset}>Reset</Reset>
      </Buttons>
    </TimerContainer>
  )
}

const TimerContainer = styled.div`
  position: fixed;
  right: ${(props) => (props.toggle ? '25px' : '-300px')};
  top: 0px;
  transition: all 0.5s ease;
  width: 270px;
  height: calc(100vh - 20px);

  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  padding: 50px 50px 0px 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: ${COLORS.WHITE};

  time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-size: 30px;
  }
  p {
    height: 55px;
    padding-top: 6px;
    font-size: 30px;
    color: ${COLORS.THEME_COLOR4};
  }
`
const IsNotRunning = styled.div`
  height: 21.6px;
`

const Btns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
`
const Clock = styled.div``
const UpperBtn = styled.div``
const LowerBtn = styled.div``

const Hours = styled.time``
const Minutes = styled.time``
const Seconds = styled.time``

const Times = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const OptionBtn = styled.div`
  border: none;
  display: flex;
  margin: 10px;
  margin-left: auto;
  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  [type='checkbox'] {
    appearance: none;
    position: relative;
    border: max(2px, 0.1em) solid gray;
    border-radius: 1.25em;
    width: 2.25em;
    height: 1.25em;
  }
  [type='checkbox']::before {
    content: '';
    position: absolute;
    left: 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    transform: scale(0.8);
    background-color: ${COLORS.GREY};
    transition: left 250ms linear;
  }
  [type='checkbox']:checked {
    background-color: ${COLORS.THEME_COLOR2};
    border-color: ${COLORS.THEME_COLOR2};
  }
  [type='checkbox']:checked::before {
    background-color: ${COLORS.WHITE};
    left: 1em;
  }
  [type='checkbox']:disabled {
    border-color: ${COLORS.WHITE};
    opacity: 0.7;
    cursor: not-allowed;
  }
  [type='checkbox']:disabled:before {
    background-color: ${COLORS.WHITE};
  }
  [type='checkbox']:disabled + span {
    opacity: 0.7;
    cursor: not-allowed;
  }
  [type='checkbox']:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) solid tomato;
  }
  [type='checkbox']:enabled:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  }
  span {
    text-align: center;
    justify-content: center;
  }
`
const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 50px;

  button {
    height: 25px;
    width: 60px;
    border-radius: 5px;
    opacity: 0.8;
  }
  button:hover {
    opacity: 1;
  }
`
const Pause = styled.button`
  background-color: ${COLORS.RED};
`
const Start = styled.button`
  background-color: ${COLORS.THEME_COLOR2};
`
const Reset = styled.button`
  background-color: ${COLORS.BLUE};
`

export default TimerBoard
