/**
 * Navbar component containing elements like notification.
 *
 * This component renders a top navigation bar.
 *
 * @component
 * 
 * @example
 * return (
 *   <Navbar />
 * );
 */
import React from 'react';

const Navbar = () => {

  return (
    <div className="h-16 w-screen border-b border-gray-200 fixed top-0 flex flex-row items-center justify-between px-4">
        <div className='mr-3 mt-2 text-slate-600'>
        
        </div>
    </div>
  );
};

export default Navbar;