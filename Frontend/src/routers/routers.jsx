import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import React from 'react'
import SearchPage from '../pages/SearchPage'
import MyGroupPage from '../pages/MyGroupPage'
import MeetingRoomPage from '../pages/MeetingRoomPage'
import MyPage from '../pages/MyPage'
import GroupManagementPage from '../pages/GroupManagementPage'

import GroupCreatePage from '../pages/GroupCreatePage'
import MeetWaiting from '../pages/MeetWaiting'
import TempWaitingPage from '../pages/TempWaitingPage'
import MeetingPage from '../pages/MeetingPage'
function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mygroup" element={<MyGroupPage />} />
        <Route path="/mr" element={<MeetingRoomPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/groups/manage" element={<GroupManagementPage />} />
        <Route path="/groups/create" element={<GroupCreatePage />} />
        <Route path="/mw" element={<MeetWaiting />} />
        <Route path="/testWaiting" element={<TempWaitingPage />} />
        <Route path="/testMeeting" element={<MeetingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default RouterApp
