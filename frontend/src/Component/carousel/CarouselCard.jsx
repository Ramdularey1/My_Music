import React from 'react'

function CarouselCard(props) {
  return (
    <div className='group flex-shrink-0 min-w-[280px] md:min-w-[400px] h-[200px] md:h-[280px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-spotify-green/30'>
      <div className='relative w-full h-full'>
        <img
          src={props.url}
          alt="Album"
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4'>
          <button className='bg-spotify-green text-black px-6 py-2 rounded-full font-bold hover:bg-spotify-green-light transition-colors'>
            Play
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarouselCard