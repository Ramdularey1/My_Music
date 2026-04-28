import React from 'react';
import { useRef } from 'react';
import SongType from './SongType';
import { topSongCategory } from '../../constant';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

function SongCategory() {
  const boxRef = useRef(null);

  const btnPressPrev = () => {
    const box = boxRef.current;
    if (box) {
      const width = box.clientWidth;
      box.scrollLeft -= width;
    }
  };

  const btnPressNext = () => {
    const box = boxRef.current;
    if (box) {
      const width = box.clientWidth;
      box.scrollLeft += width;
    }
  };

  return (
    <div className='my-12'>
      <div className='mb-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-spotify-text'>New Releases</h2>
        <p className='text-spotify-text-secondary text-sm mt-1'>Discover the latest tracks everyone is talking about</p>
      </div>
      
      <div className='group relative'>
        {/* Left Arrow */}
        <button
          onClick={btnPressPrev}
          className='absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-spotify-green hover:bg-spotify-green-light text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg'
          aria-label="Previous"
        >
          <GoArrowLeft size={24} />
        </button>

        {/* Carousel */}
        <div
          className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4'
          ref={boxRef}
        >
          {topSongCategory.map((item) => (
            <SongType
              key={item.id}
              name={item.type}
              url={item.imgUrl}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={btnPressNext}
          className='absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-spotify-green hover:bg-spotify-green-light text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg'
          aria-label="Next"
        >
          <GoArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default SongCategory;

