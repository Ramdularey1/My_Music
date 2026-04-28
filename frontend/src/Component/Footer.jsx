import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FiTwitter } from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";

function Footer() {
  return (
    <footer className='bg-spotify-darker border-t border-spotify-light-gray text-spotify-text py-8 mt-12'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Top Section - Apps and Links */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-spotify-light-gray'>
          <div className='flex gap-4'>
            <div className='p-3 bg-spotify-gray rounded-lg hover:bg-spotify-light-gray transition-colors'>
              <img className='w-24 h-auto' src={"./public/hindi.jpeg"} alt="MyMusic" />
            </div>
            <div className='flex gap-4'>
              <div className='p-3 bg-spotify-gray rounded-lg hover:bg-spotify-light-gray transition-colors'>
                <img className='w-24 h-auto' src={"./public/apple.png"} alt="Apple Music" />
              </div>
              <div className='p-3 bg-spotify-gray rounded-lg hover:bg-spotify-light-gray transition-colors'>
                <img className='w-24 h-auto' src={"./public/playstore.png"} alt="Play Store" />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className='flex gap-4 items-center'>
            <a href="#" className='p-3 bg-spotify-gray hover:bg-spotify-green hover:text-black rounded-full transition-all duration-300 transform hover:scale-110'>
              <FaInstagram size={20} />
            </a>
            <a href="#" className='p-3 bg-spotify-gray hover:bg-spotify-green hover:text-black rounded-full transition-all duration-300 transform hover:scale-110'>
              <CiYoutube size={20} />
            </a>
            <a href="#" className='p-3 bg-spotify-gray hover:bg-spotify-green hover:text-black rounded-full transition-all duration-300 transform hover:scale-110'>
              <FiTwitter size={20} />
            </a>
            <a href="#" className='p-3 bg-spotify-gray hover:bg-spotify-green hover:text-black rounded-full transition-all duration-300 transform hover:scale-110'>
              <CiFacebook size={20} />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className='py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
          <div className='text-sm text-spotify-text-secondary space-y-2 md:space-y-0'>
            <div className='flex flex-wrap gap-4'>
              <a href="#" className='hover:text-spotify-green transition-colors'>ABOUT US</a>
              <span>|</span>
              <a href="#" className='hover:text-spotify-green transition-colors'>PRIVACY POLICY</a>
              <span>|</span>
              <a href="#" className='hover:text-spotify-green transition-colors'>TERMS OF USE</a>
              <span>|</span>
              <a href="#" className='hover:text-spotify-green transition-colors'>CONTACT US</a>
            </div>
          </div>
          <div className='text-sm text-spotify-text-secondary'>
            © 2024 MyMusic. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
