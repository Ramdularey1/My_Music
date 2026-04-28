import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';

function SongType(props) {
  const [route, setRoute] = useState("");

  const handleClick = (item) => {
    setRoute(item);
  };

  useEffect(() => {
    setRoute(props.name);
  }, [props.name]);
  
  return (
    <div className='flex-shrink-0'>
      <Link to={route}>
        <div
          onClick={() => handleClick(props.name)}
          className='group relative w-[200px] h-[250px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-spotify-green/30'
        >
          <img
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
            src={props.url}
            alt={props.name}
          />
          
          {/* Overlay on hover */}
          <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4'>
            <div></div>
            <div className='flex items-end justify-between'>
              <div>
                <p className='text-white font-bold text-sm'>{props.name}</p>
                <p className='text-spotify-text-secondary text-xs'>Playlist</p>
              </div>
              <button className='bg-spotify-green hover:bg-spotify-green-light text-black p-3 rounded-full transition-all hover:scale-110 shadow-lg'>
                <BsPlayFill size={16} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SongType;

