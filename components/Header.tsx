import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className='bg-gray-900 text-white p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Open Source Path finder</h1>
        <nav>
          <Link href='/' className='mr-4 hover:underline'>
            Home
          </Link>
          <Link href='/about' className='hover:underline'>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
