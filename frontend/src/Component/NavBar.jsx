import React, { useEffect, useState, useRef } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { HiOutlineHome } from "react-icons/hi";
import { BiLibrary, BiSearch } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdPlaylistPlay } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateAllSongs } from '../utils/allSongsSlice';
import { logout } from '../utils/authSlice';

function NavBar() {
  const dispacher = useDispatch()
  const navigate = useNavigate();
  const reduxDispatch = useDispatch();
  const allSongs = useSelector(store => store.allSongs.allSongs);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const location = useLocation();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/users/getmusic")
        dispacher(updateAllSongs(response.data.data));
      } catch (error) {
        console.log(error)
      }
    }
    fetchSong()
  }, []);

  const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef(null);

  const handleResize = () => {
    const isSmall = window.innerWidth <= 768;
    setIsSmallDevice(isSmall);
    if (!isSmall) setSidebarOpen(true);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSmallDevice) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      localStorage.removeItem("user");
      reduxDispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Error while logging out", error);
    }
  };

  const navLinks = [
    { name: 'Home', icon: HiOutlineHome, path: '/' },
    { name: 'All Music', icon: BiLibrary, path: '/allmusic' },
    { name: 'Trending', icon: BiSearch, path: '/trendingsong' },
    { name: 'New Songs', icon: IoAddCircleOutline, path: '/newsong' },
    { name: 'Hindi Songs', icon: HiOutlineHome, path: '/Hindi Song' },
    { name: 'Old Music', icon: HiOutlineHome, path: '/oldmusic' },
    ...(isAuthenticated || user ? [{ name: 'My Playlists', icon: MdPlaylistPlay, path: '/playlists' }] : [])
  ];

  return (
    <div className="flex h-screen bg-spotify-black">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:static md:translate-x-0 z-40 w-[280px] h-full bg-spotify-darker border-r border-spotify-light-gray transition-transform duration-300 ease-in-out overflow-y-auto`}
      >
        {/* Logo Section */}
        <div className='p-6 flex items-center justify-between'>
          <Link to="/" className='flex items-center gap-2 group'>
            <div className='w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center'>
              <span className='text-black font-bold text-lg'>♪</span>
            </div>
            <span className='text-xl font-bold font-poppins text-spotify-text group-hover:text-spotify-green transition-colors'>MyMusic</span>
          </Link>
          {isSmallDevice && (
            <button
              onClick={() => setSidebarOpen(false)}
              className='md:hidden text-spotify-text-secondary hover:text-spotify-text'
            >
              <RxCross2 size={24} />
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className='px-4 pb-6'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Search songs, artists...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-spotify-light-gray text-spotify-text placeholder-spotify-text-secondary rounded-full py-2 px-4 pl-10 outline-none focus:ring-2 focus:ring-spotify-green transition-all'
            />
            <BiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-text-secondary' size={18} />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className='px-3 space-y-1'>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => isSmallDevice && setSidebarOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-spotify-green text-black font-semibold'
                    : 'text-spotify-text-secondary hover:text-spotify-text hover:bg-spotify-light-gray'
                }`}
              >
                <Icon size={22} />
                <span className='text-sm font-medium'>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Liked Section */}
        {/* <div className='mt-8 px-3 border-t border-spotify-light-gray pt-4'>
          <button className='flex items-center gap-4 px-4 py-3 rounded-lg text-spotify-text-secondary hover:text-spotify-text hover:bg-spotify-light-gray transition-all w-full'>
            <IoAddCircleOutline size={22} />
            <span className='text-sm font-medium'>Create Playlist</span>
          </button>
        </div> */}

        {/* Auth Section */}
        <div className='mt-8 px-3 border-t border-spotify-light-gray pt-4'>
          {isAuthenticated || user ? (
            <>
              <div className='bg-spotify-light-gray rounded-lg p-3 mb-3'>
                <p className='text-spotify-text-secondary text-xs mb-2'>Logged in as:</p>
                <p className='text-spotify-text font-semibold text-sm truncate'>
                  {isAuthenticated ? user?.username : (user && JSON.parse(user)?.username)}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className='w-full bg-spotify-green hover:bg-green-500 text-black font-semibold py-2 px-4 rounded-lg transition-all'
              >
                Logout
              </button>
            </>
          ) : (
            <div className='space-y-2'>
              <Link
                to="/login"
                className='flex items-center justify-center px-4 py-2 bg-spotify-green hover:bg-green-500 text-black font-semibold rounded-lg transition-all'
              >
                Login
              </Link>
              <Link
                to="/auth"
                className='flex items-center justify-center px-4 py-2 bg-spotify-light-gray hover:bg-spotify-text-secondary text-spotify-text font-semibold rounded-lg transition-all'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      {isSmallDevice && (
        <div className='absolute top-0 left-0 right-0 h-16 bg-spotify-darker border-b border-spotify-light-gray flex items-center justify-between px-4 z-30'>
          <Link to="/" className='text-spotify-green font-bold'>MyMusic</Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className='text-spotify-text'
          >
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

export default NavBar;

