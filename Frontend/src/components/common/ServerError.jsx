import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ServerError = () => {
  return (
    <div>
      <p>에러가 발생했습니다.</p>
      <Link to="/">Home으로 돌아가기</Link>
    </div>
  )
}

export default ServerError
