import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'

function GridScreen({ grid }) {
  const [columns, rows, rate] = grid
  const [fullHorizontal, setFullHorizontal] = useState(false)

  useEffect(() => {
    console.log(rate)
    const line = (9 * rows) / (5 * columns)
    setFullHorizontal(rate < line)
  }, [rate])

  useEffect(() => {
    console.log(rows + ' ' + columns + ' ' + rate)
  }, [rows, columns])

  return (
    <GridContainer rows={rows} columns={columns} mode={fullHorizontal}>
      {Array.from({ length: rows * columns }).map((_, index) => (
        <GridCell key={index} rows={rows} columns={columns} />
      ))}
    </GridContainer>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.columns}, 1fr);
  grid-template-columns: repeat(${(props) => props.rows}, 1fr);
  gap: 10px;
  background-color: #f0f0f0;
  padding: 10px;

  width: ${(props) => (props.mode ? '100%' : undefined)};
  height: ${(props) => (props.mode ? undefined : '100%')};
  // 비율 나중에 수정
  aspect-ratio: ${(props) => (props.rows > props.columns ? 27 / 10 : 18 / 15)};
`

const GridCell = styled.div`
  display: flex;
  aspect-ratio: 9 / 5;
`

export default GridScreen
