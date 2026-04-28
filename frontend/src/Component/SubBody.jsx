import React from 'react'
import SongCategory from './SongCategory'
import Artist from './Artist'


function SubBody() {
  return (
    <div className='flex justify-center'>
        <div className=' w-11/12 '>
            <SongCategory/>
            <Artist/>
        </div>
    </div>
  )
}

export default SubBody