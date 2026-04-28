import React, { useState } from 'react';
import PlayingMusic from './PlayingMusic';
import Music from './Music';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateCurrentSong } from '../utils/currentMusicSlice';

function AllMusic() {
  const dispatcher = useDispatch();
  const allSongs = useSelector(store => store.allSongs.allSongs);

  const [selectedMusic, setSelectedMusic] = useState(null);

  const handlePlay = (items) => {
    setSelectedMusic(items);
    dispatcher(updateCurrentSong(items));
  };

  return (
    <>
      <div className='min-h-screen bg-spotify-black pb-32'>
        {/* Hero Section */}
        <div className='relative h-64 md:h-80 bg-gradient-to-b from-spotify-green/20 to-spotify-black overflow-hidden'>
          <div className='absolute inset-0 flex items-end p-6 md:p-12'>
            <div className='flex gap-6 items-end w-full'>
              <div className='w-40 h-40 rounded-xl overflow-hidden shadow-2xl flex-shrink-0'>
                <img
                  className='w-full h-full object-cover'
                  src={"./public/hindi.jpeg"}
                  alt="Trending in Hindi"
                />
              </div>
              <div className='flex-1 mb-4'>
                <p className='text-spotify-text-secondary text-sm font-semibold'>PLAYLIST</p>
                <h1 className='text-4xl md:text-6xl font-bold text-spotify-text mt-2'>Trending Hindi</h1>
                <p className='text-spotify-text-secondary mt-2 text-sm'>Discover the hottest Hindi songs trending right now</p>
              </div>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div className='px-6 md:px-12 py-8'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-2xl md:text-3xl font-bold text-spotify-text mb-6'>All Songs</h2>

            <div className='space-y-3'>
              {allSongs && allSongs.length > 0 ? (
                allSongs.map((items) => (
                  <PlayingMusic
                    key={items._id}
                    image={items.musicImage}
                    name={items.musicName}
                    singername={items.singerName}
                    audio={items.musicAudio}
                    songId={items._id}
                    handleClick={() => handlePlay(items)}
                  />
                ))
              ) : (
                <div className='text-center py-12'>
                  <p className='text-spotify-text-secondary text-lg'>No songs available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedMusic && <Music musicData={selectedMusic} />}
    </>
  );
}

export default AllMusic;

