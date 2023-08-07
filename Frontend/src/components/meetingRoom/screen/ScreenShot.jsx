import React from 'react'
import { styled } from 'styled-components'
import GridScreen from './_GridScreen'
import { useGridSize } from './useGridSize' // 커스텀 훅 가져오기
import CONSOLE from '../../../utils/consoleColors'

function ScreenShot() {
  CONSOLE.reRender('ScreenShot Rerendered!')
  const { gridRef, screenRef } = useGridSize() // 커스텀 훅 사용

  return (
    <Screen ref={screenRef}>
      <GridScreen grid={gridRef}></GridScreen>
    </Screen>
  )
}

const Screen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 200px);
  padding: 20px;
`

export default ScreenShot
