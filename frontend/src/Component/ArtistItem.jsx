import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsPlayFill } from 'react-icons/bs';

function ArtistItem(props) {
  const [singerName, setSingerName] = useState();

  const handleClick = (item) => {
    setSingerName(item);
  }
  
  useEffect(() => {
    setSingerName(props.name);
  }, [props.name])

  return (
    <div className='flex-shrink-0'>
      <Link to={singerName}>
        <div
          onClick={() => handleClick(props.name)}
          className='group relative w-[200px] h-[250px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-spotify-green/30'
        >
          {/* Artist Image - Circular */}
          <div className='w-full h-[200px] overflow-hidden rounded-xl'>
            <img
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
              src={props.url}
              alt={props.name}
            />
          </div>

          {/* Artist Name */}
          <div className='p-3 bg-spotify-gray'>
            <p className='text-spotify-text font-semibold text-sm truncate'>{props.name}</p>
            <p className='text-spotify-text-secondary text-xs'>Artist</p>
          </div>

          {/* Overlay on hover */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 rounded-xl'>
            <button className='bg-spotify-green hover:bg-spotify-green-light text-black p-3 rounded-full transition-all hover:scale-110 shadow-lg'>
              <BsPlayFill size={20} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ArtistItem
