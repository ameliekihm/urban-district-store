import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 relative'>
      <div className='w-full h-full bg-cover bg-banner' />
      <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='text-7xl'>Shop With Us</h2>
        <p className='text-3xl py-4'>Premium Products, Great Deals</p>
      </div>
    </section>
  );
}
