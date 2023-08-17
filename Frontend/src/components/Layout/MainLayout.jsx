import React from 'react'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

const MainLayout = ({ children }) => {
  return (
    <div>
      <MainHeader />
      <main
        className="container"
        style={{
          height: 'auto',
          minHeight: '100vh',
          paddingBottom: '200px',
        }}
      >
        {children}
      </main>
      <MainFooter
        style={{
          height: '200px',
          position: 'relative',
          transform: 'translateY(-100%)',
        }}
      />
    </div>
  )
}

export default MainLayout
