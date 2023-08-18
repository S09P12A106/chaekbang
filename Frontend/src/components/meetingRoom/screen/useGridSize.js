import React, { useState, useEffect, useRef } from 'react'
import CONSOLE from '../../../utils/consoleColors'

export function useGridSize() {
  // [columns, rows, rate]
  const [gridRef, setGridRef] = useState([1, 1, 1.8])
  const screenRef = useRef()

  useEffect(() => {
    const observer = new ResizeObserver((entries, observer) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect
        const newGrid = calculateGridSize(width, height)
        setGridRef(newGrid)
      }
    })

    // 스크린의 크기를 감지하겠다.
    observer.observe(screenRef.current)

    return () => {
      observer.disconnect() // 컴포넌트가 언마운트되면 ResizeObserver를 해제합니다.
    }
  }, [])

  // 스크린의 너비 높이로 그리드 크기를 계산하는 함수
  const calculateGridSize = (width, height) => {
    // 인원수로 선택할 수 있는 그리드가 2*3 또는 3*2라고 가정
    // n과 m은 따로 변수로 설정하지 않음 저장을 따로 할 것. 아래는 임시
    let n = 2
    let m = 3

    // 표준 비율 ( 5 : 9 )(불변)
    const standardRate = 1.8
    const currentRate = width / height

    // 현재 화면 비율이 표준 비율보다 크다면
    if (currentRate < standardRate) {
      // n과m 중에 작은 값이 n에 들어가고 큰 값은 m에 들어가는 로직
      return [m, n, currentRate]
    } else {
      return [n, m, currentRate]
    }
  }

  return { gridRef, screenRef }
}
