import React, { useContext, useState, useEffect } from 'react'
import { styled } from 'styled-components'
import MainOpBox from './opBoxComponents/MainOpBox'
import CreateOpBox from './opBoxComponents/CreateOpBox'
import ActiveOpBox from './opBoxComponents/ActiveOpBox'
import ResultOpBox from './opBoxComponents/ResultOpBox'

import { OpBoxBoardContext } from '../context/OpBoxBoardContext'
import { OpBoxHistoryContext } from '../context/OpBoxHistoryContext'
import COLORS from '../../../constants/colors'
import { BoardContext } from '../context/BoardContext'

function OpBoxBoard() {
  const [whichOpBoxContext, setWhichOpBoxContext] = useState(0)
  const [whichIndex, setWhichIndex] = useState(0)
  const [opBoxHistory, setOpBoxHistory] = useState([])

  const { whichBtn, setWhichBtn, client } = useContext(BoardContext)
  const [isToggleOpen, setIsToggleOpen] = useState(false)

  useEffect(() => {
    if (whichBtn === 2) {
      setIsToggleOpen(true)
    } else {
      setIsToggleOpen(false)
    }
  }, [whichBtn])

  // 데이터 받아서 opBoxHistory 넣기
  useEffect(() => {
    try {
      client.subscribe('/meeting/opBox/opBoxList', (message) => {
        const ResponseData = JSON.parse(message.body)
        console.log('의견함이 생성')
        setOpBoxHistory([...opBoxHistory, ResponseData])
      })
    } catch (error) {
      console.log('의견함 받는데 오류', error)
    }
  }, [client])

  const OpBoxBoardComponents = {
    0: <MainOpBox></MainOpBox>,
    1: <CreateOpBox></CreateOpBox>,
    2: <ActiveOpBox index={whichIndex}></ActiveOpBox>,
    3: <ResultOpBox index={whichIndex}></ResultOpBox>,
  }
  const OpBoxBoardInfo = OpBoxBoardComponents[whichOpBoxContext]

  return (
    <OpBoxBoardContext.Provider
      value={{
        whichOpBoxContext,
        setWhichOpBoxContext,
        whichIndex,
        setWhichIndex,
      }}
    >
      <OpBoxHistoryContext.Provider value={{ opBoxHistory, setOpBoxHistory }}>
        <OpBoxBoardContainer toggle={isToggleOpen}>
          {OpBoxBoardInfo}
        </OpBoxBoardContainer>
      </OpBoxHistoryContext.Provider>
    </OpBoxBoardContext.Provider>
  )
}

const OpBoxBoardContainer = styled.div`
  position: fixed;
  right: ${(props) => (props.toggle ? '25px' : '-300px')};
  top: 0px;
  transition: all 0.5s ease;
  display: flex;
  width: 270px;
  height: calc(100vh - 20px);
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: ${COLORS.WHITE};
  margin: 10px 0px;
  padding-right: 30px;
`

export default OpBoxBoard
