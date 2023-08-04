import React from 'react'
import { useState } from 'react'
import { styled } from 'styled-components'
import MainOpBox from './opBoxComponents/MainOpBox'
import CreateOpBox from './opBoxComponents/CreateOpBox'
import ActiveOpBox from './opBoxComponents/ActiveOpBox'
import ResultOpBox from './opBoxComponents/ResultOpBox'

import { OpBoxBoardContext } from '../context/OpBoxBoardContext'
import { OpBoxHistoryContext } from '../context/OpBoxHistoryContext'

function OpBoxBoard() {
  const [whichOpBoxContext, setWhichOpBoxContext] = useState(0)
  const [whichIndex, setWhichIndex] = useState(0)
  const [opBoxHistory, setOpBoxHistory] = useState([])

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
        <OpBoxBoardContainer>{OpBoxBoardInfo}</OpBoxBoardContainer>
      </OpBoxHistoryContext.Provider>
    </OpBoxBoardContext.Provider>
  )
}

const OpBoxBoardContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export default OpBoxBoard
