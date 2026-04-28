import React from 'react'
import Carousel from './carousel/Carousel'
import SubBody from './SubBody'

function Body() {
  return (
    <div className='min-h-screen bg-spotify-black'>
      {/* Hero Section with Gradient */}
      <div className='relative pt-8 pb-12'>
        <div className='absolute inset-0 bg-spotify-dark-gradient pointer-events-none'></div>
        <div className='relative px-6 md:px-12'>
          <div className='mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-spotify-text mb-2'>
              Welcome to Your Music
            </h1>
            <p className='text-spotify-text-secondary text-lg'>
              Discover, stream, and enjoy millions of songs
            </p>
          </div>
          
          {/* Featured Carousel */}
          <div className='relative'>
            <Carousel />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='px-6 md:px-12 pb-20'>
        <SubBody />
      </div>
    </div>
  )
}

export default Body