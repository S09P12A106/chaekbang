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
import SignUpPage from '../pages/SignUpPage'
import LoginPage from '../pages/LoginPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import MeetingCreatePage from '../pages/MeetingCreatePage'
import GroupDetailPage from '../pages/GroupDetailPage'
import GroupHomePage from '../pages/GroupHomePage'

import TempWaitingPage from '../pages/TempWaitingPage'
import MeetingPage from '../pages/MeetingPage'

import NotFoundPage from '../pages/NotFoundPage'
import ServerErrorPage from '../pages/ServerErrorPage'
import MeetingDetailPage from '../pages/MeetingDetailPage'

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/groups/detail/:groupId" element={<GroupDetailPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/mygroup" element={<MyGroupPage />} />
          <Route path="/groups/create" element={<GroupCreatePage />} />
          <Route path="/groups/:id/manage" element={<GroupManagementPage />} />
          <Route
            path="/groups/:id/meetings/create"
            element={<MeetingCreatePage />}
          />
          <Route
            path="/groups/:groupId/meetings/:meetingId"
            element={<MeetingDetailPage />}
          />
          <Route path="/groups/home/:groupId" element={<GroupHomePage />} />
          <Route path="/meeting" element={<MeetingPage />} />
        </Route>
        <Route path="/error" element={<ServerErrorPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default RouterApp
