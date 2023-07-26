import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import React from 'react'
import SearchPage from '../pages/SearchPage'
import MyGroupPage from '../pages/MyGroupPage'

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mygroup" element={<MyGroupPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default RouterApp
