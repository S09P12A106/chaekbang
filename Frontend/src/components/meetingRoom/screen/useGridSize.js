import React, { useState, useEffect, useRef } from 'react'
import CONSOLE from '../../../utils/consoleColors'
import { useMember } from './useMember'

export function useGridSize({ number }) {
  // [columns, rows, rate]
  const [gridRef, setGridRef] = useState([1, 1, 1.8, 1, 1])
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
    // n 세로, m 가로 그리드 칸 수
    const memberValues = useMember(number)
    const n = 2
    const m = 3

    // 표준 비율 ( 5 : 9 )(불변)
    const standardRate = 1.8
    const currentRate = width / height

    // 현재 화면 비율이 표준 비율보다 크다면
    // if (currentRate < standardRate) {
    //   // n과m 중에 작은 값이 n에 들어가고 큰 값은 m에 들어가는 로직
    //   return [m, n, currentRate, n, m]
    // } else {
    return [n, m, currentRate, n, m]
    // }
  }

  return { gridRef, screenRef }
}
