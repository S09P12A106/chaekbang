import React, { useState } from 'react'
import styled from 'styled-components'
import COLORS from '../../../constants/colors'
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { useHandleTime } from './useHandleTime'

function TimerBoard() {
  const [isRunning, setIsRunning] = useState(false)

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

  // 타이머 시작 버튼을 눌렀을 때
  const handleStart = () => {
    setIsRunning(true)
  }

  // 타이머 일시정지 버튼을 눌렀을 때
  const handlePause = () => {
    setIsRunning(false)
  }

  // 타이머 초기화 버튼을 눌렀을 때
  const handleReset = () => {
    setIsRunning(false)
    setHour(0)
    setMinute(0)
    setSecond(0)
  }

  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn)
  }

  // 숫자를 두 자리 수로 바꾸기 위해
  const transformDouble = (time) => {
    return `${time.toString().padStart(2, '0')}`
  }

  return (
    <TimerContainer>
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
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
  margin-top: 50px;

  time {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 55px;
    background-color: white;
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
  background-color: ${COLORS.WHITE};
`
const Start = styled.button`
  background-color: ${COLORS.THEME_COLOR2};
`
const Reset = styled.button`
  background-color: ${COLORS.WHITE};
`

export default TimerBoard
