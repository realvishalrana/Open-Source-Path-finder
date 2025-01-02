import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <Header />
      <main className='container mx-auto px-4 py-8 flex-grow'>
        <h1 className='text-4xl font-bold mb-4 text-gray-800'>About Open Source Path finder</h1>
        <p className='text-lg text-gray-700 mb-4'>
          Open Source Path finder is a web application that allows users to search for projects and
          Discord servers based on various criteria.
        </p>
        <p className='text-lg text-gray-700 mb-4'>
          Our goal is to provide a comprehensive platform for developers to find and contribute to
          open-source projects, as well as discover and join Discord communities related to coding
          and programming.
        </p>
        <p className='text-lg text-gray-700'>Stay tuned for more features and updates!</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
