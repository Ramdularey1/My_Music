import React, { useState } from 'react';
import { RiDownloadLine } from "react-icons/ri";
import { BsPause, BsPlay } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { useSelector } from 'react-redux';
import AddToPlaylistModal from './Playlist/AddToPlaylistModal';

function PlayingMusic({ audio, image, name, singername, handleClick, songId }) {
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audio;
    link.download = `${name}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className='mt-8 px-4 py-6 bg-gradient-to-r from-spotify-green/10 to-spotify-green/5 border border-spotify-green/20 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300'>
        <div className='flex items-center justify-between gap-4'>
          {/* Album Art and Info */}
          <div className='flex items-center gap-4 flex-1 min-w-0'>
            <div className='flex-shrink-0'>
              <img
                className='w-20 h-20 rounded-lg shadow-lg object-cover'
                src={image}
                alt={name}
              />
            </div>

            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-bold text-spotify-text truncate'>{name}</h1>
              <p className='text-sm text-spotify-text-secondary truncate'>{singername}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center gap-3 flex-shrink-0'>
            <button
              onClick={handleDownload}
              className='p-2 text-spotify-text-secondary hover:text-spotify-green transition-colors hover:bg-spotify-light-gray rounded-full'
              title='Download song'
            >
              <RiDownloadLine size={20} />
            </button>

            {isAuthenticated && (
              <button
                onClick={() => setIsPlaylistModalOpen(true)}
                className='p-2 text-spotify-text-secondary hover:text-spotify-green transition-colors hover:bg-spotify-light-gray rounded-full'
                title='Add to playlist'
              >
                <MdPlaylistAdd size={20} />
              </button>
            )}

            <button
              onClick={handleClick}
              className='px-6 py-2 text-sm font-bold text-black bg-spotify-green hover:bg-spotify-green-light rounded-full transition-all hover:scale-105 shadow-lg flex items-center gap-2'
            >
              <BsPlay size={16} />
              Play
            </button>
          </div>
        </div>
      </div>

      <AddToPlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        songId={songId}
        songName={name}
      />
    </>
  );
}

export default PlayingMusic;
