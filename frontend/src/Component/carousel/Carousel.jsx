import React, { useRef, useState, useEffect } from 'react';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import CarouselCard from './CarouselCard';
import { topalbum } from '../../../constant';

function Carousel() {
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
    <div className='relative group'>
      <h2 className='text-2xl md:text-3xl font-bold text-spotify-text mb-6'>Featured Albums</h2>
      
      <div className='relative'>
        {/* Left Arrow */}
        <button
          onClick={btnPressPrev}
          className='absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-spotify-green hover:bg-spotify-green-light text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg'
          aria-label="Previous"
        >
          <GoArrowLeft size={24} />
        </button>

        {/* Carousel Container */}
        <div
          className='flex overflow-x-scroll scrollbar-hide scroll-smooth gap-4'
          ref={boxRef}
        >
          {topalbum.map((items) => (
            <CarouselCard
              key={items.id}
              url={items.imageUrl}
              albumName={items.albumName}
              route={items.route}
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

export default Carousel;

