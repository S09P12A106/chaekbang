import React from 'react'
import HeaderComp from './HeaderComp'
import FooterComp from './FooterComp'

const MainLayout = ({ children }) => {
  return (
    <div>
      <HeaderComp />
      <main className="container">{children}</main>
      <FooterComp />
    </div>
  )
}

export default MainLayout
