import React from 'react'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <main className="container">{children}</main>
      <MainFooter />
    </div>
  )
}

export default MainLayout
