import React from 'react';
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
    return (
        <div className='fixed top-0 left-0 w-full z-50 bg-white shadow-md flex items-start justify-between py-2 px-[4%]'>
            <img src={assets.logo} alt="" className='w-[max(10%,80px)]'/>
            <button onClick={() => setToken('')} className=' bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    );
};

export default Navbar;