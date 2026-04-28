import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BsPlay } from 'react-icons/bs';

function CarouselCard({ url, albumName, route }) {
  const navigate = useNavigate();

  const handlePlayClick = (e) => {
    e.preventDefault();
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className='group flex-shrink-0 min-w-[280px] md:min-w-[400px] h-[200px] md:h-[280px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-spotify-green/30'>
      <div className='relative w-full h-full'>
        <img
          src={url}
          alt={albumName || "Album"}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4'>
          <div className='flex flex-col gap-2 w-full'>
            <p className='text-white text-sm font-semibold truncate'>{albumName}</p>
            <button 
              onClick={handlePlayClick}
              className='w-12 h-12 rounded-full bg-spotify-green text-black hover:bg-spotify-green-light transition-all hover:scale-110 flex items-center justify-center shadow-lg'
              title='Browse collection'
            >
              <BsPlay size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarouselCard