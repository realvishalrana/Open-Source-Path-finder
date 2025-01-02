import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white p-4 mt-8 shadow-md'>
      <div className='container mx-auto text-center'>
        <p>&copy; {new Date().getFullYear()} Open Source Path finder. All rights reserved.</p>
        <p>
          <a
            href='https://github.com/realvishalrana'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline'
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
