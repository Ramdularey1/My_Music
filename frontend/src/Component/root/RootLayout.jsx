import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar'
import Footer from '../Footer'
import MusicContainer from '../MusicContainer'

const RootLayout = () => {
  return (
    <div className='flex h-screen bg-spotify-black'>
      <NavBar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <div className='flex-1 overflow-y-auto pt-16 md:pt-0'>
          <Outlet />
          <MusicContainer />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default RootLayout