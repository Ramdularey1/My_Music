import React from 'react'
import { Link } from 'react-router-dom'
function Type() {

    return (
        <div className='h-[50px]    bg-slate-400'>
            <div className='flex items-center h-full  px-3 gap-4 *:shrink-0 overflow-x-scroll ml-[10px] scrollbar-hide'>
                <Link to={"/allmusic"}><div>All</div></Link>
                <Link  to={"/trendingsong"}><div >Trending Now</div></Link>
                <Link to={"/oldmusic"}><div>Old Song</div></Link>
                <Link to={"/newsong"}><div>New Song</div></Link>
                <Link to={"/topalbum"}><div>Top Albums</div></Link>
            </div>
        </div>
    )
}

export default Type