import React, { useState } from 'react';
import { BsPlay, BsPause } from 'react-icons/bs';
import { IoVolumeHigh } from 'react-icons/io5';

function Music({ musicData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-gradient-to-t from-spotify-darker to-spotify-gray border-t border-spotify-light-gray p-4 md:p-6 z-50'>
      <div className='max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-6'>
        {/* Album Info */}
        <div className='flex items-center gap-3 md:gap-4 min-w-0 flex-shrink-0'>
          <div className='w-16 h-16 md:w-20 md:h-20 rounded-lg shadow-lg overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={musicData.musicImage}
              alt="Now Playing"
            />
          </div>
          <div className='hidden sm:block min-w-0'>
            <p className='text-spotify-text font-semibold truncate text-sm md:text-base'>Now Playing</p>
            <p className='text-spotify-text-secondary text-xs md:text-sm truncate'>{musicData.musicName || 'Song'}</p>
          </div>
        </div>

        {/* Audio Player */}
        <div className='flex-1 min-w-0'>
          <audio
            key={musicData.musicAudio}
            controls
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className='w-full h-8 accent-spotify-green'
            style={{
              accentColor: '#1DB954'
            }}
          >
            <source src={musicData.musicAudio} type="audio/mpeg" />
          </audio>
        </div>

        {/* Volume Control */}
        <div className='flex items-center gap-2 hidden md:flex flex-shrink-0'>
          <IoVolumeHigh className='text-spotify-text-secondary' size={18} />
          <input
            type='range'
            min='0'
            max='100'
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className='w-20 h-1 rounded-full cursor-pointer accent-spotify-green'
            style={{
              accentColor: '#1DB954'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Music;

